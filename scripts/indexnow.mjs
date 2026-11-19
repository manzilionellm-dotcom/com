import {readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const site=JSON.parse(await readFile('content/site.json','utf8'));
const gone=JSON.parse(await readFile('content/withdrawn.json','utf8'));
const origin=site.origin;
const live=site.editions.flatMap(ed=>ed.pages.map(p=>origin+p.path));
const removed=gone.map(path=>origin+path);
const options={redirect:'manual',signal:AbortSignal.timeout(15000)};
const fetchLive=async url=>fetch(url,{...options,signal:AbortSignal.timeout(15000)});
const keyLocation=origin+'/'+site.indexNowKey+'.txt';
const check=await fetchLive(keyLocation);
assert(check.ok&&(await check.text()).trim()===site.indexNowKey,'Public key is missing on the production host');
for(const url of live){
 const res=await fetchLive(url);assert.equal(res.status,200,url);
 assert(!(res.headers.get('x-robots-tag')||'').toLowerCase().includes('noindex'),url);
 const text=await res.text();assert(text.includes('rel="canonical" href="'+url+'"')&&!text.includes('content="noindex'),url);
}
for(const url of removed){const res=await fetchLive(url);assert.equal(res.status,410,url);}
const body={host:new URL(origin).hostname,key:site.indexNowKey,keyLocation,urlList:[...live,...removed]};
const r=await fetch('https://api.indexnow.org/indexnow',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(20000)});
console.log(JSON.stringify({at:new Date().toISOString(),endpoint:'https://api.indexnow.org/indexnow',status:r.status,submitted:body.urlList}));
assert([200,202].includes(r.status),'Notification not accepted');
