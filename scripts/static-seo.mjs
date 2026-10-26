import fs from 'node:fs/promises';
import {restaurantSchema,validateSettings} from '../server/domain.mjs';
const root=new URL('../',import.meta.url),catalog=JSON.parse(await fs.readFile(new URL('data/catalog.json',root),'utf8'));
if(process.argv[2])catalog.site=validateSettings({publicUrl:process.argv[2]},catalog.site);
const base=catalog.site.publicUrl||'',esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const title=catalog.site.name+' — Hyderabadi dum & charcoal',description='Hyderabadi dum biriyani, charcoal tandoor and a table for your people. Explore the menu, order and request a table at '+catalog.site.name+'.';
const head=`<!-- SEO:START -->
<meta name="description" content="${esc(description)}">
<meta name="robots" content="${base?'index,follow':'noindex,nofollow'}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta name="twitter:card" content="summary_large_image">
${base?`<link rel="canonical" href="${esc(base)}/"><meta property="og:url" content="${esc(base)}/"><meta property="og:image" content="${esc(base)}/media/img/feast.webp"><meta name="twitter:image" content="${esc(base)}/media/img/feast.webp">`:''}
<script type="application/ld+json">${JSON.stringify(restaurantSchema(catalog,base)).replace(/</g,'\\u003c')}</script>
<!-- SEO:END -->`;
const file=new URL('index.html',root),html=await fs.readFile(file,'utf8');await fs.writeFile(file,html.replace(/<!-- SEO:START -->[\s\S]*?<!-- SEO:END -->/,head));
await fs.writeFile(new URL('data/catalog.json',root),JSON.stringify(catalog,null,2)+'\n');
await fs.writeFile(new URL('robots.txt',root),base?`User-agent: *\nAllow: /\nDisallow: /admin.html\nDisallow: /api/\nSitemap: ${base}/sitemap.xml\n`:'User-agent: *\nDisallow: /\n');
await fs.writeFile(new URL('sitemap.xml',root),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${base?`<url><loc>${esc(base)}/</loc></url><url><loc>${esc(base)}/privacy.html</loc></url>`:''}</urlset>\n`);
console.log(base?'Static SEO prepared for '+base:'Preview SEO prepared. Indexing stays disabled until a final domain is configured.');
