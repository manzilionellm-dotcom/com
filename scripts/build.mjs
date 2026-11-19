import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { gzipSync } from 'node:zlib';

const json = async path => JSON.parse(await readFile(path, 'utf8'));
const site = await json('content/site.json');
const withdrawn = await json('content/withdrawn.json');
const preview = process.env.VERCEL_ENV === 'preview';
const output = '.vercel/output';
const files = join(output, 'static');
const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const local = {
  en: { skip:'Skip to content', home:'Home', guides:'Guides', desk:'Editorial desk', contents:'Explore the guides', read:'Continue reading', source:'Sources', faq:'Reader question', date:'Updated', by:'Written by', license:'Editorial publication', empty:'Page unavailable', gone:'This address has been withdrawn.', missing:'This address could not be found.', method:'Method', case:'Worked example' },
  fr: { skip:'Aller au contenu', home:'Accueil', guides:'Guides', desk:'Rédaction', contents:'Parcourir les guides', read:'À lire ensuite', source:'Sources', faq:'Question pratique', date:'Mise à jour', by:'Rédaction', license:'Publication éditoriale', empty:'Page indisponible', gone:'Cette adresse a été retirée.', missing:'Cette adresse est introuvable.', method:'Méthode', case:'Exemple' },
  pl: { skip:'Przejdź do treści', home:'Start', guides:'Poradniki', desk:'Redakcja', contents:'Wybierz poradnik', read:'Czytaj dalej', source:'Źródła', faq:'Pytanie czytelnika', date:'Aktualizacja', by:'Autor', license:'Publikacja redakcyjna', empty:'Strona niedostępna', gone:'Ta strona została wycofana.', missing:'Nie znaleziono tej strony.', method:'Metoda', case:'Przykład' }
};
const label = {'en':'English','fr':'Français','en-CA':'English (Canada)','fr-CA':'Français (Canada)','pl':'Polski'};
const url = path => site.origin + path;
const anchor = (path, text, attrs='') => '<a href="'+escape(path)+'"'+attrs+'>'+escape(text)+'</a>';
async function put(path, value) {
  const dest=join(files,path); await mkdir(dirname(dest),{recursive:true}); await writeFile(dest,value);
}
const linkTag = (rel, href, extra='') => '<link rel="'+rel+'" href="'+escape(href)+'"'+extra+'>';
const schema = obj => '<script type="application/ld+json">'+JSON.stringify({'@context':'https://schema.org','@graph':obj}).replace(/</g,'\\u003c')+'</script>';
const faqId = (path) => url(path)+'#faq';
const schemaFaq = p => ({'@type':'FAQPage','@id':faqId(p.path),mainEntity:[{'@type':'Question',name:p.question,acceptedAnswer:{'@type':'Answer',text:p.answer}}]});
const dateFmt = lang => new Intl.DateTimeFormat(lang,{dateStyle:'long',timeZone:'UTC'}).format(new Date(site.date+'T00:00:00Z'));
const xml = s => '<?xml version="1.0" encoding="UTF-8"?>\n'+s+'\n';
await rm(output,{recursive:true,force:true}); await mkdir(files,{recursive:true});
const routes=[];
const siteUrls=[];
const sitemapRows=[];
const templates = ['folio','atlas','lab','bureau','studio'];
const styleId=site.style;
if (!templates.includes(styleId)) throw Error('Unknown editorial style');
const org={'@type':'Organization','@id':site.origin+'/#publisher',name:site.name,url:site.origin+'/'};
for(const {lang,pages} of site.editions) {
  const l=local[lang.slice(0,2)];
  const home=pages[0], hub=pages[1], desk=pages.at(-1);
  const signature={'@type':'Organization','@id':url(desk.path)+'#author',name:'Codex',url:url(desk.path)};
  for (const [i,p] of pages.entries()) {
    const isGuide=i>1 && i<pages.length-1;
    const alts=site.editions.map(ed=>[ed.lang,ed.pages[i].path]);
    const articleUrl=url(p.path);
    const parents=p===home?[]:(isGuide?[home,hub]:[home]);
    const crumbs=[...parents,p];
    const bread={'@type':'BreadcrumbList',itemListElement:crumbs.map((s,j)=>({'@type':'ListItem',position:j+1,name:s.title,item:url(s.path)}))};
    const graph=[schemaFaq(p)];
    if(p===home) graph.push(org,{'@type':'WebSite',name:site.name,url:url(home.path),inLanguage:lang,publisher:{'@id':org['@id']}});
    if(p!==home) graph.push(bread);
    if(isGuide) graph.push({'@type':'Article',headline:p.title,description:p.description,dateModified:site.date+'T12:00:00+01:00',datePublished:site.date+'T12:00:00+01:00',author:signature,publisher:org,inLanguage:lang,mainEntityOfPage:articleUrl,citation:p.sources.map(s=>site.sources[s][1])});
    if(p===desk) graph.push({'@type':'AboutPage',url:articleUrl,about:org,author:signature});
    if(p===hub) graph.push({'@type':'CollectionPage',url:articleUrl,hasPart:pages.slice(2,-1).map(a=>({'@type':'WebPage',url:url(a.path),name:a.title}))});
    if(p.steps) graph.push({'@type':'HowTo',name:p.title,step:p.steps.map(text=>({'@type':'HowToStep',text}))});
    const altTags=alts.length>1?alts.map(([key,path])=>linkTag('alternate',url(path),' hreflang="'+key+'"')).join('')+linkTag('alternate',url(alts[0][1]),' hreflang="x-default"'):'';
    const langSwitch=alts.filter(([key])=>key!==lang).map(([key,path])=>anchor(path,label[key],' hreflang="'+key+'" lang="'+key+'"')).join('');
    const nav=[anchor(home.path,site.name,' class="brand"'),'<nav aria-label="'+l.guides+'">'+anchor(hub.path,l.guides)+anchor(desk.path,l.desk)+langSwitch+'</nav>'].join('');
    const trail=parents.length?'<nav class="crumb" aria-label="'+({en:'Breadcrumbs',fr:'Fil d’Ariane',pl:'Ścieżka strony'}[lang.slice(0,2)])+'">'+parents.map(c=>anchor(c.path,c===home?l.home:c.title)).join(' <span aria-hidden="true">/</span> ')+'</nav>':'';
    const stamp='<div class="stamp"><span>'+l.by+' · '+anchor(desk.path,'Codex')+'</span><span>'+l.date+' · <time datetime="'+site.date+'">'+dateFmt(lang)+'</time></span></div>';
    const intro='<header class="intro">'+trail+'<h1>'+escape(p.title)+'</h1><p class="lead">'+escape(p.lead)+'</p>'+stamp+'</header>';
    const instructions=p.steps?'<ol class="steps">'+p.steps.map(step=>'<li>'+escape(step)+'</li>').join('')+'</ol>':'';
    const details='<section><h2>'+escape(p.heading)+'</h2><p>'+escape(p.body)+'</p>'+instructions+'</section><section class="example"><h2>'+escape(p.field)+'</h2><p>'+escape(p.example)+'</p></section>';
    const faq='<section id="faq"><h2>'+l.faq+'</h2><h3>'+escape(p.question)+'</h3><p>'+escape(p.answer)+'</p></section>';
    const sources='<section class="sources"><h2>'+l.source+'</h2><ul>'+p.sources.map(s=>'<li>'+anchor(site.sources[s][1],site.sources[s][0])+'</li>').join('')+'</ul></section>';
    const related=(p===home?[hub,...pages.slice(2,-1)]:p===hub?pages.slice(2,-1):[hub,...pages.slice(2,-1).filter(a=>a!==p).slice(0,2)]);
    const links='<section class="library"><h2>'+(isGuide?l.read:l.contents)+'</h2><ul>'+related.map(a=>'<li>'+anchor(a.path,a.title)+'<span>'+escape(a.description)+'</span></li>').join('')+'</ul></section>';
    const head='<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>'+escape(p.title)+'</title><meta name="description" content="'+escape(p.description)+'">'+(preview?'<meta name="robots" content="noindex, follow">':'')+linkTag('canonical',articleUrl)+altTags+linkTag('stylesheet','/styles.css')+schema(graph);
    const body='<a class="skip" href="#main">'+l.skip+'</a><header class="mast">'+nav+'</header><main id="main" tabindex="-1">'+intro+(p===home||p===hub?links:'')+'<div class="columns"><article>'+details+faq+sources+'</article>'+(p===home||p===hub?'':links)+'</div></main><footer>'+anchor(home.path,site.name)+'<span>'+l.license+'</span>'+anchor(desk.path,l.desk)+'</footer>';
    const filename=p.path==='/'?'index.html':p.path.slice(1)+'.html';
    await put(filename,'<!doctype html><html lang="'+lang+'"><head>'+head+'</head><body class="'+styleId+'">'+body+'</body></html>\n');
    routes.push({src:'^'+p.path+'$',dest:'/'+filename});
    if(p.path!=='/') routes.push({src:'^'+p.path+'/$',status:308,headers:{Location:p.path}});
    // Prevent a second indexable copy at the physical file address.
    routes.push({src:'^/'+filename.replaceAll('.','\\.')+'$',status:308,headers:{Location:p.path}});
    siteUrls.push(articleUrl);
    const alternatives=alts.length>1?alts.map(([k,v])=>'<xhtml:link rel="alternate" hreflang="'+k+'" href="'+escape(url(v))+'"/>').join('')+'<xhtml:link rel="alternate" hreflang="x-default" href="'+escape(url(alts[0][1]))+'"/>':'';
    sitemapRows.push('<url><loc>'+escape(articleUrl)+'</loc><lastmod>'+site.date+'</lastmod>'+alternatives+'</url>');
  }
}
const l=local[site.editions[0].lang.slice(0,2)];
for(const code of [404,410]){
 const msg=code===410?l.gone:l.missing;
 await put(code+'.html','<!doctype html><html lang="'+site.editions[0].lang+'"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>'+escape(l.empty)+'</title>'+linkTag('stylesheet','/styles.css')+'</head><body><main><h1>'+l.empty+'</h1><p>'+msg+'</p>'+anchor('/',l.home)+'</main></body></html>');
}
const bots=['Googlebot','Bingbot','OAI-SearchBot','ChatGPT-User','PerplexityBot','Claude-SearchBot','Claude-User','Perplexity-User','*'];
const agents=bots.map(b=>'User-agent: '+b).join('\n');
await put('robots.txt',agents+'\n'+(preview?'Disallow: /':'Allow: /\nDisallow: /api/\nDisallow: /admin/')+'\n'+(preview?'':'Sitemap: '+url('/sitemap.xml'))+'\n');
await put('llms.txt','# '+site.name+'\n\n'+site.editions.map(e=>'> '+e.pages[0].lead+'\n\n## '+label[e.lang]+'\n\n'+e.pages.map(p=>'- ['+p.title+']('+url(p.path)+'): '+p.description).join('\n')).join('\n\n')+'\n');
const sitemap=xml('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">'+sitemapRows.join('\n')+'</urlset>');
await put('sitemap.xml',sitemap); await put('sitemap.xml.gz',gzipSync(sitemap));
await put(site.indexNowKey+'.txt',site.indexNowKey+'\n');
const css=await readFile('styles.css','utf8');
await put('styles.css',':root{--ink:'+site.theme[0]+';--wash:'+site.theme[1]+';--accent:'+site.theme[2]+'}\n'+css);
const safePattern = p => p.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const retired=withdrawn.length?[{src:'^(?:'+withdrawn.map(safePattern).join('|')+')/?$',status:410,dest:'/410.html',headers:{'X-Robots-Tag':'noindex'}}]:[];
const legacyEntries = site.retiredQuery ? [{
  src:'^/$', has:[{type:'query',key:'lang',value:'pl'}],status:410,dest:'/410.html',headers:{'X-Robots-Tag':'noindex'}
}]:[];
const config={version:3,routes:[...(preview?[{src:'/(.*)',headers:{'X-Robots-Tag':'noindex, nofollow'},continue:true}]:[]),...legacyEntries,...retired,...routes,{handle:'filesystem'},{src:'/(.*)',status:404,dest:'/404.html'}]};
await writeFile(join(output,'config.json'),JSON.stringify(config,null,2)+'\n');
console.log(site.name+' · '+siteUrls.length+' pages · '+withdrawn.length+' withdrawn paths');
