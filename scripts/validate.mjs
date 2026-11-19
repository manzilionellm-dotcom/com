import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {gunzipSync} from 'node:zlib';
const base='.vercel/output/static/';
const read = p=>readFile(base+p,'utf8');
const site=JSON.parse(await readFile('content/site.json','utf8'));
const routes=JSON.parse(await readFile('.vercel/output/config.json','utf8')).routes;
const withdrawn=JSON.parse(await readFile('content/withdrawn.json','utf8'));
const xml=await read('sitemap.xml');
assert.equal(gunzipSync(await readFile(base+'sitemap.xml.gz')).toString(),xml);
const sitemap=new Set(Array.from(xml.matchAll(/<loc>(.*?)<\/loc>/g),m=>m[1]));
const all=site.editions.flatMap(e=>e.pages);
const paths=new Set(all.map(p=>p.path));
assert.equal(paths.size,all.length);
assert.equal(sitemap.size,all.length);
const titles=new Set(), metas=new Set();
const names=/\b(?:sky sports|tnt sports|espn|dazn|premier league|champions league|bundesliga|laliga|ekstraklasa|aggregateRating|m3u8?)\b|canal\+/i;
for(const edition of site.editions) {
 for(const [idx,p] of edition.pages.entries()) {
  const html=await read(p.path==='/'?'index.html':p.path.slice(1)+'.html');
  assert(!names.test(html),p.path);
  assert(html.includes('lang="'+edition.lang+'"'));
  assert.equal((html.match(/<h1>/g)||[]).length,1);
  assert(!titles.has(p.title)&&p.title.length<60&&p.title.trim(),p.title); titles.add(p.title);
  assert(!metas.has(p.description)&&p.description.length<155&&p.description.trim(),p.description); metas.add(p.description);
  assert(p.lead.split(/\s+/).length<=50);
  const canonical=site.origin+p.path;
  assert(html.includes('rel="canonical" href="'+canonical+'"'));
  assert(sitemap.has(canonical));
  const route=routes.find(r=>r.src&&!r.continue&&!r.has&&new RegExp(r.src).test(p.path));
  assert.equal(route?.dest,p.path==='/'?'/index.html':p.path+'.html');
  if(site.editions.length>1)for(const e of site.editions)assert(html.includes('hreflang="'+e.lang+'"')&&html.includes(site.origin+e.pages[idx].path+'"'));
  const graph=JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1])['@graph'];
  const faq=graph.find(item=>item['@type']==='FAQPage');assert.equal(faq.mainEntity[0].name,p.question);
  assert(html.includes('<h3>')&&html.includes('id="faq"'));
  for(const m of html.matchAll(/<a href="([^"]+)"/g)){
   if(m[1].startsWith('/'))assert(paths.has(m[1]),m[1]);
  }
 }
}
for(const path of withdrawn){
 assert(!paths.has(path),'Conflict: '+path);
 const hit=routes.find(r=>r.src&&!r.continue&&!r.has&&new RegExp(r.src).test(path));
 assert.equal(hit?.status,410,path);
}
const robots=await read('robots.txt');
for(const agent of ['Googlebot','Bingbot','OAI-SearchBot','ChatGPT-User','PerplexityBot','Claude-SearchBot','Claude-User','Perplexity-User'])assert(robots.includes('User-agent: '+agent+'\n'));
assert.equal((await read(site.indexNowKey+'.txt')).trim(),site.indexNowKey);
assert((await read('llms.txt')).includes(site.origin));
console.log('Passed editorial, routing, structured-data, sitemap, language and crawler checks on '+all.length+' pages.');
