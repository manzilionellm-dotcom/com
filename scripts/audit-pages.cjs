const {chromium}=require('playwright');
const fs=require('node:fs');
(async()=>{
 const site=JSON.parse(fs.readFileSync('content/site.json'));
 const pages=site.editions.flatMap(x=>x.pages);
 const browser=await chromium.launch({executablePath:process.env.CHROME_PATH||'/usr/bin/google-chrome',args:['--no-sandbox']});
 const rows=[];
 try{
  const tab=await browser.newPage({viewport:{width:390,height:844}});
  for(const page of pages){
   const response=await tab.goto('http://127.0.0.1:4173'+page.path);
   await tab.addScriptTag({path:require.resolve('axe-core/axe.min.js')});
   const result=await tab.evaluate(()=>axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}}));
   rows.push({path:page.path,status:response.status(),mobileFits:await tab.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),violations:result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))});
  }
 }finally{await browser.close();}
 fs.mkdirSync('reports',{recursive:true});fs.writeFileSync('reports/accessibility.json',JSON.stringify(rows,null,2));
 if(rows.some(r=>r.status!==200||!r.mobileFits||r.violations.length))process.exitCode=1;
 console.log(rows.length+' routes checked');
})().catch(e=>{console.error(e);process.exitCode=1;});
