import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {resolve,sep,extname} from 'node:path';
const root=resolve('.vercel/output/static');
const {routes}=JSON.parse(await readFile('.vercel/output/config.json','utf8'));
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.xml':'application/xml','.txt':'text/plain; charset=utf-8','.gz':'application/gzip'};
const server=createServer(async(req,res)=>{
 const requestUrl=new URL(req.url,'http://localhost');
 const path=requestUrl.pathname;
 let file=path,status=200;
 for(const rule of routes){
  if(rule.has?.some(h=>h.type==='query'&&requestUrl.searchParams.get(h.key)!==h.value))continue;
  if(rule.handle==='filesystem'){
   try {await readFile(resolve(root,'.'+path));break;} catch {continue;}
  }
  if(!rule.src||!new RegExp(rule.src).test(path))continue;
  for(const [k,v] of Object.entries(rule.headers||{}))res.setHeader(k,v);
  if(rule.continue)continue;
  status=rule.status||200;
  if(status===308){res.writeHead(status);res.end();return;}
  file=rule.dest||path;break;
 }
 const target=resolve(root,'.'+file);
 if(!target.startsWith(root+sep)){res.writeHead(404);res.end();return;}
 try {const data=await readFile(target);res.writeHead(status,{'Content-Type':mime[extname(file)]||'application/octet-stream'});res.end(data);}
 catch {res.writeHead(404);res.end();}
});
server.listen(Number(process.env.PORT||4173),'127.0.0.1',()=>console.log('Ready'));
