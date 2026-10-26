import crypto from 'node:crypto';
export const clean=(value,max=200)=>typeof value==='string'?value.trim().slice(0,max):'';
export function fail(message,status=400){const error=new Error(message);error.status=status;throw error;}
export const cents=value=>Math.round(Number(value)*100);
export const slug=value=>String(value).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,70);
export const hash=value=>crypto.createHash('sha256').update(value).digest('hex');
export const safeEqual=(a,b)=>{const x=Buffer.from(String(a)),y=Buffer.from(String(b));return x.length===y.length&&crypto.timingSafeEqual(x,y);};
export function validateCatalog(input,current){
 if(!input||!Array.isArray(input.menu)||input.menu.length<1||input.menu.length>100)fail('Provide between 1 and 100 menu items.');
 const groups=['Biriyani','Tandoor','Curries','Breads & Sides','Drinks'];const ids=new Set();
 const menu=input.menu.map(item=>{
  const id=slug(item.id||item.name),name=clean(item.name,80),price=Number(item.price);
  if(!id||ids.has(id)||!name||!groups.includes(item.group)||!Number.isFinite(price)||price<0||price>10000)fail('Each item needs a unique ID, name, category and valid price.');ids.add(id);
  const sale=item.salePrice==null||item.salePrice===''?null:Number(item.salePrice);
  if(sale!==null&&(!Number.isFinite(sale)||sale<0||sale>price))fail('A special price must be between zero and the regular price.');
  const old=current.menu.find(x=>x.id===id)||{};
  return {...old,id,name,group:item.group,description:clean(item.description,500),price:cents(price)/100,veg:!!item.veg,available:item.available!==false,special:!!item.special,specialText:clean(item.specialText,80),salePrice:sale===null?null:cents(sale)/100,spiceOptions:!!item.spiceOptions,extras:Array.isArray(item.extras)?item.extras.filter(x=>current.extras.some(e=>e.id===x)):[]};
 });
 // Preserve the eight cinematic entries; the owner may mark them unavailable.
 for(const signature of current.signatures)if(!ids.has(signature.id))fail('Keep the eight signature items; mark them unavailable instead of deleting them.');
 const extras=current.extras.map(old=>{const item=Array.isArray(input.extras)?input.extras.find(e=>e.id===old.id):old;if(!item)fail('Keep the existing extras; mark them unavailable instead.');const price=Number(item.price),name=clean(item.name,80);if(!name||!Number.isFinite(price)||price<0||price>10000)fail('Each extra needs a name and valid price.');return {...old,name,price:cents(price)/100,available:item.available!==false};});
 return {...current,menu,extras,revision:current.revision+1};
}
export function validateSettings(input,old){
 const site={...old};for(const key of ['name','city','phone','phoneDisplay','address','instagram','whatsapp','publicUrl','bookingUrl'])if(key in input)site[key]=clean(input[key],key==='address'?250:200);
 if(!site.name||!site.phone||!site.address)fail('Business name, phone and address are required.');
 if(site.whatsapp&&!/^[1-9]\d{7,14}$/.test(site.whatsapp.replace(/[+\s()-]/g,'')))fail('WhatsApp needs the full international number, including country code.');
 site.whatsapp=site.whatsapp.replace(/[+\s()-]/g,'');
 for(const key of ['publicUrl','instagram','bookingUrl'])if(site[key]){let url;try{url=new URL(site[key]);}catch{fail(`${key} must be a valid https URL.`);}if(url.protocol!=='https:'||url.username||url.password)fail(`${key} must use HTTPS without embedded credentials.`);if(key==='publicUrl'){if(url.pathname!=='/'||url.search||url.hash)fail('Website URL must be the root domain, such as https://yourdomain.com.');site[key]=url.origin;}}
 if('hours' in input){site.hours={};for(let day=0;day<7;day++){const h=input.hours[day];if(h==null)continue;if(!Array.isArray(h)||h.length!==2||h.some(v=>!/^([01]\d|2[0-3]):[0-5]\d$/.test(v))||h[0]===h[1])fail('Each day needs valid opening and closing times.');site.hours[day]=h;}}
 return site;
}
export function quoteOrder(lines,catalog){
 if(!Array.isArray(lines)||!lines.length||lines.length>40)fail('Add at least one item, up to 40 different selections.');
 let quantity=0,total=0;
 const items=lines.map(line=>{const product=catalog.menu.find(x=>x.id===line.id);if(!product||!product.available)fail('An item is no longer available. Refresh your cart.',409);
  const qty=Number(line.quantity);if(!Number.isInteger(qty)||qty<1||qty>20)fail('Choose a quantity from 1 to 20.');quantity+=qty;
  const selected=Array.isArray(line.extras)?[...new Set(line.extras)]:[];
  const extras=selected.map(id=>{const extra=catalog.extras.find(x=>x.id===id&&x.available);if(!extra||!product.extras.includes(id))fail('An extra is no longer available. Refresh your cart.',409);return{id:extra.id,name:extra.name,price:extra.price};});
  const spice=product.spiceOptions?clean(line.spice,20)||'Medium':'';if(spice&&!['Mild','Medium','Hot'].includes(spice))fail('Choose a valid spice level.');
  const unit=cents(product.special&&product.salePrice!==null?product.salePrice:product.price)+extras.reduce((sum,e)=>sum+cents(e.price),0);const amount=unit*qty;total+=amount;
  return{id:product.id,name:product.name,quantity:qty,spice,extras,unitCents:unit,totalCents:amount};
 });
 if(quantity>100)fail('For orders over 100 items, please call the restaurant.');
 return{items,totalCents:total,currency:catalog.site.currency,revision:catalog.revision};
}
const minute=value=>{const [h,m]=value.split(':').map(Number);return h*60+m;};
export function openAtLocal(date,time,site){
 const day=new Date(date+'T12:00:00Z').getUTCDay(),now=minute(time),today=site.hours[day],previous=site.hours[(day+6)%7];
 return !!previous&&minute(previous[1])<=minute(previous[0])&&now<minute(previous[1]) || !!today&&now>=minute(today[0])&&(minute(today[1])<=minute(today[0])||now<minute(today[1]));
}
export function localInstant(date,time,timezone){
 const [y,m,d]=date.split('-').map(Number),[h,mi]=time.split(':').map(Number);const target=Date.UTC(y,m-1,d,h,mi);let guess=target;
 const format=new Intl.DateTimeFormat('en-CA',{timeZone:timezone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'});
 for(let i=0;i<4;i++){const p=Object.fromEntries(format.formatToParts(new Date(guess)).map(x=>[x.type,x.value]));const represented=Date.UTC(+p.year,+p.month-1,+p.day,+p.hour,+p.minute);const delta=target-represented;if(delta===0)return guess;guess+=delta;}
 return null;
}
export function slotsFor(date,site,now=Date.now()){
 if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||!Number.isFinite(Date.parse(date+'T12:00:00Z'))||new Date(date+'T12:00:00Z').toISOString().slice(0,10)!==date)return[];
 const slots=[];for(let min=0;min<1440;min+=30){const time=String(Math.floor(min/60)).padStart(2,'0')+':'+String(min%60).padStart(2,'0');if(!openAtLocal(date,time,site))continue;const instant=localInstant(date,time,site.timezone);if(instant!==null&&instant>=now+site.reservationLeadMinutes*60000&&instant<=now+90*86400000)slots.push(time);}
 return slots;
}
export function validateReservation(input,site){
 const name=clean(input.name,80),phone=clean(input.phone,30),email=clean(input.email,150),date=clean(input.date,10),time=clean(input.time,5),party=Number(input.party),notes=clean(input.notes,500);
 if(name.length<2||phone.replace(/\D/g,'').length<7||phone.replace(/\D/g,'').length>15)fail('Enter your name and a valid contact number.');
 if(email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))fail('Enter a valid email address, or leave it blank.');
 if(!Number.isInteger(party)||party<1||party>12)fail('Choose 1–12 guests. For larger groups, please call.');
 if(!slotsFor(date,site).includes(time))fail('This time is outside opening hours, too soon, or more than 90 days away. Choose another slot.',409);
 return{name,phone,email,date,time,party,notes,timezone:site.timezone,scheduledAt:new Date(localInstant(date,time,site.timezone)).toISOString()};
}
export function restaurantSchema(catalog,base=''){
 const s=catalog.site,days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
 return{'@context':'https://schema.org','@type':'Restaurant',name:s.name,description:'Hyderabadi dum biriyani and charcoal tandoor.',telephone:s.phone,servesCuisine:['Hyderabadi','Indian'],currenciesAccepted:s.currency,address:{'@type':'PostalAddress',streetAddress:s.address,addressLocality:s.city},openingHoursSpecification:Object.entries(s.hours).map(([d,h])=>({'@type':'OpeningHoursSpecification',dayOfWeek:days[+d],opens:h[0],closes:h[1]})),...(base?{url:base+'/',image:base+'/media/img/feast.webp',hasMenu:base+'/#menu'}:{}),...(s.instagram?{sameAs:[s.instagram]}:{})};
}
