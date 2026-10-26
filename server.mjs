import http from 'node:http';
import fs from 'node:fs/promises';
import {createReadStream} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import crypto from 'node:crypto';
import {clean,fail,hash,safeEqual,validateCatalog,validateSettings,quoteOrder,slotsFor,validateReservation,restaurantSchema} from './server/domain.mjs';

const root=path.dirname(fileURLToPath(import.meta.url)),host=process.env.HOST||'127.0.0.1',port=Number(process.env.PORT||4174);
const dataDir=path.resolve(process.env.DATA_DIR||path.join(root,'.runtime'));
await fs.mkdir(dataDir,{recursive:true});
const seed=JSON.parse(await fs.readFile(path.join(root,'data/catalog.json'),'utf8'));
async function load(file,fallback){try{return JSON.parse(await fs.readFile(path.join(dataDir,file),'utf8'));}catch(e){if(e.code==='ENOENT')return fallback;throw e;}}
let state=await load('store.json',{catalog:seed,reservations:[],analytics:[],metrics:[]});
let owner=await load('owner.json',null),queue=Promise.resolve();
const encodePassword=password=>{const salt=crypto.randomBytes(24).toString('hex');return{salt,hash:crypto.scryptSync(password,salt,64).toString('hex')};};
const passwordMatches=password=>safeEqual(crypto.scryptSync(password,owner.salt,64).toString('hex'),owner.hash);
if(process.env.ADMIN_PASSWORD){if(process.env.ADMIN_PASSWORD.length<12)throw new Error('ADMIN_PASSWORD must contain at least 12 characters.');owner=encodePassword(process.env.ADMIN_PASSWORD);}
if(host!=='127.0.0.1'&&host!=='localhost'&&!owner)throw new Error('Set ADMIN_PASSWORD before exposing the server outside localhost.');
if(process.env.PUBLIC_URL)state.catalog.site.publicUrl=validateSettings({publicUrl:process.env.PUBLIC_URL},state.catalog.site).publicUrl;
async function atomic(file,value){const target=path.join(dataDir,file),temp=target+'.'+crypto.randomUUID()+'.tmp';await fs.writeFile(temp,JSON.stringify(value,null,2),{mode:0o600});await fs.rename(temp,target);}
function transact(change){const operation=queue.then(async()=>{const next=structuredClone(state);const result=await change(next);next.reservations=next.reservations.filter(r=>Date.parse(r.createdAt)>Date.now()-90*86400000);next.analytics=next.analytics.filter(e=>e.at>Date.now()-30*86400000).slice(-30000);next.metrics=next.metrics.filter(e=>e.at>Date.now()-30*86400000).slice(-10000);await atomic('store.json',next);state=next;return result;});queue=operation.catch(()=>{});return operation;}
await transact(()=>{});
setInterval(()=>transact(()=>{}).catch(e=>console.error('Retention cleanup failed:',e.message)),3600000).unref();
const sessions=new Map(),limits=new Map();
const isLoopback=req=>['127.0.0.1','::1','::ffff:127.0.0.1'].includes(req.socket.remoteAddress);
const localSetup=req=>isLoopback(req)&&/^localhost(?::\d+)?$|^127\.0\.0\.1(?::\d+)?$/.test(req.headers.host||'')&&!state.catalog.site.publicUrl;
function rate(req,bucket,max,window=60000){const key=bucket+':'+req.socket.remoteAddress,now=Date.now(),entry=limits.get(key);if(!entry||now-entry.start>window){limits.set(key,{start:now,count:1});return;}if(++entry.count>max)fail('Too many attempts. Please try again shortly.',429);}
setInterval(()=>{const now=Date.now();for(const[k,v]of sessions)if(v.expires<now)sessions.delete(k);for(const[k,v]of limits)if(now-v.start>3600000)limits.delete(k);},60000).unref();
function origin(req){const header=req.headers.origin;let parsed;try{parsed=new URL(header);}catch{fail('A same-origin request is required.',403);}const allowed=state.catalog.site.publicUrl;const local=isLoopback(req)&&['localhost','127.0.0.1'].includes(parsed.hostname)&&parsed.host===req.headers.host;if(!(local||allowed&&parsed.origin===allowed))fail('This origin is not allowed.',403);}
function session(req){const cookie=(req.headers.cookie||'').split(';').map(x=>x.trim()).find(x=>x.startsWith('bw_owner='));if(!cookie)return null;const entry=sessions.get(hash(cookie.slice(9)));return entry&&entry.expires>Date.now()?entry:null;}
function auth(req){const s=session(req);if(!s)fail('Sign in to manage the restaurant.',401);return s;}
function adminMutation(req){const s=auth(req);if(!safeEqual(req.headers['x-csrf-token']||'',s.csrf))fail('Refresh the owner page and try again.',403);}
async function body(req,max=131072){let size=0,chunks=[];for await(const chunk of req){size+=chunk.length;if(size>max)fail('Request is too large.',413);chunks.push(chunk);}try{return JSON.parse(Buffer.concat(chunks).toString('utf8')||'{}');}catch{fail('Invalid JSON.');}}
function json(res,status,data,headers={}){res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store',...headers});res.end(JSON.stringify(data));}
const escapeHtml=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function seoHead(catalog){const s=catalog.site,base=s.publicUrl,title=`${s.name} — Hyderabadi dum & charcoal`,description=`Hyderabadi dum biriyani, charcoal tandoor and a table for your people. Explore the menu, order and request a table at ${s.name}.`;return `<!-- SEO:START -->\n<meta name="description" content="${escapeHtml(description)}">\n<meta name="robots" content="${base?'index,follow':'noindex,nofollow'}">\n<meta property="og:type" content="website">\n<meta property="og:title" content="${escapeHtml(title)}">\n<meta property="og:description" content="${escapeHtml(description)}">\n<meta name="twitter:card" content="summary_large_image">\n${base?`<link rel="canonical" href="${escapeHtml(base)}/"><meta property="og:url" content="${escapeHtml(base)}/"><meta property="og:image" content="${escapeHtml(base)}/media/img/feast.webp"><meta name="twitter:image" content="${escapeHtml(base)}/media/img/feast.webp">`:''}\n<script type="application/ld+json">${JSON.stringify(restaurantSchema(catalog,base)).replace(/</g,'\\u003c')}</script>\n<!-- SEO:END -->`;}
const allowedEvents=new Set(['page_view','menu_view','menu_tab','cart_add','checkout_review','whatsapp_handoff','call_click','directions_click','reservation_open']);
function dashboard(){const count=type=>state.analytics.filter(e=>e.type===type).length;const median=key=>{const values=state.metrics.map(m=>m[key]).filter(Number.isFinite).sort((a,b)=>a-b);return values.length?Math.round((values[Math.floor(values.length/2)]+values[Math.floor((values.length-1)/2)])/2*100)/100:null;};const days=Array.from({length:14},(_,i)=>new Date(Date.now()-(13-i)*86400000).toISOString().slice(0,10));return{visits:count('page_view'),menuViews:count('menu_view'),cartAdds:count('cart_add'),handoffs:count('whatsapp_handoff'),calls:count('call_click'),reservations:state.reservations.length,pending:state.reservations.filter(r=>r.status==='pending').length,confirmed:state.reservations.filter(r=>r.status==='confirmed').length,metrics:{samples:state.metrics.length,lcp:median('lcp'),cls:median('cls'),fcp:median('fcp'),ttfb:median('ttfb'),load:median('load')},daily:days.map(day=>({day,visits:state.analytics.filter(e=>e.type==='page_view'&&new Date(e.at).toISOString().startsWith(day)).length,handoffs:state.analytics.filter(e=>e.type==='whatsapp_handoff'&&new Date(e.at).toISOString().startsWith(day)).length})),integrations:{whatsapp:!!state.catalog.site.whatsapp,domain:state.catalog.site.publicUrl||null,externalBooking:state.catalog.site.bookingUrl||null},retention:'Analytics: 30 days. Reservation records: 90 days.'};}

const server=http.createServer(async(req,res)=>{
 res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','strict-origin-when-cross-origin');res.setHeader('X-Frame-Options','DENY');
 res.setHeader('Content-Security-Policy',"default-src 'self'; script-src 'self' https://cdnjs.cloudflare.com https://unpkg.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; media-src 'self' blob:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'");
 try{
  if(!['GET','HEAD','POST','PUT','PATCH','DELETE'].includes(req.method))fail('Method not allowed.',405);
  const url=new URL(req.url,'http://localhost'),route=decodeURIComponent(url.pathname);
  if(route.startsWith('/api/')){
   if(!['GET','HEAD'].includes(req.method))origin(req);
   if(route==='/api/catalog'&&req.method==='GET')return json(res,200,{...state.catalog,backend:true});
   if(route==='/api/quote'&&req.method==='POST'){rate(req,'quote',40);const data=await body(req);return json(res,200,quoteOrder(data.items,state.catalog));}
   if(route==='/api/reservations/slots'&&req.method==='GET')return json(res,200,{slots:slotsFor(url.searchParams.get('date')||'',state.catalog.site),timezone:state.catalog.site.timezone});
   if(route==='/api/reservations'&&req.method==='POST'){
    rate(req,'booking',5,600000);const data=await body(req);if(data.website)fail('Unable to submit this request.');if(data.consent!==true)fail('Confirm that the restaurant may contact you about this request.');
    const details=validateReservation(data,state.catalog.site),token=crypto.randomBytes(24).toString('hex'),id=crypto.randomUUID();
    await transact(d=>{d.reservations.push({...details,id,tokenHash:hash(token),status:'pending',createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),ownerNote:''});});
    return json(res,201,{id,token,status:'pending',date:details.date,time:details.time,party:details.party,timezone:details.timezone,message:'Your request has been received. Your table is not confirmed until the restaurant approves it.'});
   }
   if(/^\/api\/reservations\/[\w-]+$/.test(route)&&req.method==='GET'){
    rate(req,'booking-status',40);const id=route.split('/').pop(),token=(req.headers.authorization||'').replace(/^Bearer /,'');const booking=state.reservations.find(r=>r.id===id);
    if(!booking||!safeEqual(booking.tokenHash,hash(token)))fail('Reservation not found.',404);
    return json(res,200,{id:booking.id,status:booking.status,date:booking.date,time:booking.time,party:booking.party,timezone:booking.timezone,updatedAt:booking.updatedAt,message:booking.status==='confirmed'?'Your table is confirmed. We look forward to welcoming you.':booking.status==='declined'?'The restaurant could not confirm this request. Please call to arrange another time.':booking.status==='cancelled'?'This reservation has been cancelled.':'Your request is waiting for restaurant confirmation.'});
   }
   if(route==='/api/events'&&req.method==='POST'){
    rate(req,'analytics',90);const data=await body(req,8192);if(!/^[\w-]{12,80}$/.test(data.visit||'')||!Array.isArray(data.events)||data.events.length>20)fail('Invalid analytics batch.');
    await transact(d=>{for(const e of data.events){if(!allowedEvents.has(e.type))continue;if(d.analytics.some(old=>old.visit===data.visit&&old.id===e.id))continue;d.analytics.push({id:clean(e.id,80),visit:data.visit,type:e.type,at:Date.now(),label:clean(e.label,70)});}if(data.metrics){const m={visit:data.visit,at:Date.now()};for(const key of ['lcp','cls','fcp','ttfb','load']){const value=data.metrics[key];if(typeof value==='number'&&Number.isFinite(value)&&value>=0&&value<300000)m[key]=value;}const prior=d.metrics.findIndex(x=>x.visit===data.visit);if(prior>=0)d.metrics[prior]=m;else d.metrics.push(m);}});
    return json(res,200,{ok:true});
   }
   if(route==='/api/admin/status'&&req.method==='GET'){const s=session(req);return json(res,200,{initialized:!!owner,setupAllowed:!owner&&localSetup(req),authenticated:!!s,csrf:s?.csrf});}
   if(route==='/api/admin/setup'&&req.method==='POST'){
    rate(req,'login',8);if(owner||!localSetup(req))fail('Local setup is unavailable.',403);const data=await body(req,2048);if(owner)fail('Owner access has already been created.',409);if(typeof data.password!=='string'||data.password.length<12||data.password.length>128)fail('Choose a password of 12–128 characters.');owner=encodePassword(data.password);await atomic('owner.json',owner);return json(res,201,{ok:true});
   }
   if(route==='/api/admin/login'&&req.method==='POST'){
    rate(req,'login',8);const data=await body(req,2048);if(!owner||typeof data.password!=='string'||data.password.length>128||!passwordMatches(data.password))fail('Password not recognized.',401);
    const token=crypto.randomBytes(32).toString('hex'),csrf=crypto.randomBytes(24).toString('hex');sessions.set(hash(token),{csrf,expires:Date.now()+8*3600000});const secure=state.catalog.site.publicUrl?.startsWith('https:')||req.socket.encrypted;
    return json(res,200,{ok:true,csrf},{'Set-Cookie':`bw_owner=${token}; Path=/api/admin; HttpOnly; SameSite=Strict; Max-Age=28800${secure?'; Secure':''}`});
   }
   if(route.startsWith('/api/admin/')){
    if(req.method==='GET')auth(req);else adminMutation(req);
    if(route==='/api/admin/logout'&&req.method==='POST'){const cookie=(req.headers.cookie||'').split(';').map(x=>x.trim()).find(x=>x.startsWith('bw_owner='));if(cookie)sessions.delete(hash(cookie.slice(9)));return json(res,200,{ok:true},{'Set-Cookie':'bw_owner=; Path=/api/admin; HttpOnly; SameSite=Strict; Max-Age=0'});}
    if(route==='/api/admin/dashboard'&&req.method==='GET')return json(res,200,dashboard());
    if(route==='/api/admin/catalog'&&req.method==='GET')return json(res,200,state.catalog);
    if(route==='/api/admin/catalog'&&req.method==='PUT'){const data=await body(req);const result=await transact(d=>{if(data.revision!==d.catalog.revision)fail('The menu changed in another session. Reload before saving.',409);d.catalog=validateCatalog(data,d.catalog);return d.catalog;});return json(res,200,result);}
    if(route==='/api/admin/settings'&&req.method==='PUT'){const data=await body(req);const result=await transact(d=>{if(data.revision!==d.catalog.revision)fail('Settings changed in another session. Reload before saving.',409);d.catalog.site=validateSettings(data.site,d.catalog.site);d.catalog.revision++;return d.catalog;});return json(res,200,result);}
    if(route==='/api/admin/reservations'&&req.method==='GET')return json(res,200,{reservations:state.reservations.map(({tokenHash,...record})=>record).sort((a,b)=>b.createdAt.localeCompare(a.createdAt))});
    if(/^\/api\/admin\/reservations\/[\w-]+$/.test(route)&&req.method==='PATCH'){const data=await body(req),id=route.split('/').pop();if(!['pending','confirmed','declined','cancelled'].includes(data.status))fail('Invalid reservation status.');await transact(d=>{const r=d.reservations.find(x=>x.id===id);if(!r)fail('Reservation not found.',404);if(data.updatedAt!==r.updatedAt)fail('This reservation changed. Reload and try again.',409);r.status=data.status;r.ownerNote=clean(data.ownerNote,500);r.updatedAt=new Date().toISOString();});return json(res,200,{ok:true});}
    if(/^\/api\/admin\/reservations\/[\w-]+$/.test(route)&&req.method==='DELETE'){const id=route.split('/').pop();await transact(d=>{d.reservations=d.reservations.filter(r=>r.id!==id);});return json(res,200,{ok:true});}
    if(route==='/api/admin/analytics'&&req.method==='DELETE'){await transact(d=>{d.analytics=[];d.metrics=[];});return json(res,200,{ok:true});}
   }
   fail('API route not found.',404);
  }
  if(!['GET','HEAD'].includes(req.method))fail('Method not allowed.',405);
  const base=state.catalog.site.publicUrl;
  if(route==='/robots.txt'){res.writeHead(200,{'Content-Type':'text/plain'});return res.end(base?`User-agent: *\nAllow: /\nDisallow: /admin.html\nDisallow: /api/\nSitemap: ${base}/sitemap.xml\n`:'User-agent: *\nDisallow: /\n');}
  if(route==='/sitemap.xml'){res.writeHead(200,{'Content-Type':'application/xml'});return res.end(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${base?`<url><loc>${escapeHtml(base)}/</loc></url><url><loc>${escapeHtml(base)}/privacy.html</loc></url>`:''}</urlset>`);}
  const file=route==='/'?'index.html':route.replace(/^\//,'');
  if(file.includes('..')||file.includes('\\')||file.includes('\0')||!( ['index.html','admin.html','privacy.html'].includes(file)||/^(css|js|media)\/[\w./-]+$/.test(file)||file==='data/catalog.json'))fail('Not found.',404);
  const absolute=path.resolve(root,file);if(!absolute.startsWith(root+path.sep))fail('Not found.',404);
  const stat=await fs.stat(absolute).catch(()=>null);if(!stat?.isFile())fail('Not found.',404);
  if(file==='index.html'){
   let html=await fs.readFile(absolute,'utf8');html=html.replace(/<!-- SEO:START -->[\s\S]*?<!-- SEO:END -->/,seoHead(state.catalog)).replace('</head>','<meta name="restaurant-backend" content="enabled"></head>');
   html=html.replace(/<title>.*?<\/title>/,`<title>${escapeHtml(state.catalog.site.name)} — A little fire. A lot of soul.</title>`);
   if(!base)res.setHeader('X-Robots-Tag','noindex, nofollow');res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'});return res.end(req.method==='HEAD'?'':html);
  }
  if(file==='admin.html')res.setHeader('X-Robots-Tag','noindex, nofollow');
  const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json','.svg':'image/svg+xml','.webp':'image/webp','.jpg':'image/jpeg','.mp4':'video/mp4'}[path.extname(file)]||'application/octet-stream';
  const headers={'Content-Type':mime,'Content-Length':stat.size,'Cache-Control':file.startsWith('media/')?'public, max-age=3600':'no-cache','Accept-Ranges':'bytes'};
  let start=0,end=stat.size-1,status=200;
  if(req.headers.range){const match=/^bytes=(\d*)-(\d*)$/.exec(req.headers.range);if(!match||!match[1]&&!match[2])fail('Invalid byte range.',416);if(!match[1])start=Math.max(0,stat.size-Number(match[2]));else{start=Number(match[1]);if(match[2])end=Math.min(end,Number(match[2]));}if(start>end||start>=stat.size){res.setHeader('Content-Range',`bytes */${stat.size}`);fail('Range unavailable.',416);}status=206;headers['Content-Range']=`bytes ${start}-${end}/${stat.size}`;headers['Content-Length']=end-start+1;}
  res.writeHead(status,headers);if(req.method==='HEAD')return res.end();const stream=createReadStream(absolute,{start,end});stream.on('error',()=>res.destroy());stream.pipe(res);
 }catch(error){if(!res.headersSent)json(res,error.status||500,{error:error.status?error.message:'The server could not complete this request.'});else res.destroy();if(!error.status)console.error('Request failed:',error.message);}
});
server.requestTimeout=15000;server.headersTimeout=10000;
server.listen(port,host,()=>console.log(`Website: http://${host}:${port}\nOwner dashboard: http://${host}:${port}/admin.html${owner?'':' (create your owner password on first visit)'}`));
