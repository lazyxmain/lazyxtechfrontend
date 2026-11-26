import * as cheerio from 'cheerio';

type PageAudit={url:string,status:number,title:string,description:string,h1:number,canonical:string,imagesMissingAlt:number,links:string[]};
export async function crawl(startUrl:string){
 const start=new URL(startUrl);
 if(!['http:','https:'].includes(start.protocol))throw new Error('Only public HTTP and HTTPS websites can be crawled.');
 const origin=start.origin;
 const queue=[start.toString()];
 const visited=new Set<string>();
 const pages:PageAudit[]=[];
 const maxPages=20;
 while(queue.length&&pages.length<maxPages){
  const current=queue.shift()!;
  const normalized=new URL(current);normalized.hash='';normalized.search='';
  const target=normalized.toString();
  if(visited.has(target))continue;
  visited.add(target);
  try{
   const response=await fetch(target,{headers:{'user-agent':'LazyXTechSEOAudit/1.0 (+https://lazyxtech.com)','accept':'text/html,application/xhtml+xml'},signal:AbortSignal.timeout(15000),redirect:'follow'});
   const finalUrl=new URL(response.url||target);
   if(finalUrl.origin!==origin)throw new Error('Cross-origin redirect blocked.');
   const contentType=response.headers.get('content-type')||'';
   if(!contentType.includes('text/html')){pages.push({url:target,status:response.status,title:'',description:'',h1:0,canonical:'',imagesMissingAlt:0,links:[]});continue;}
   const html=await response.text();
   const $=cheerio.load(html);
   const links:string[]=[];
   $('a[href]').each((_,el)=>{const href=$(el).attr('href');if(!href)return;try{const absolute=new URL(href,target);if(absolute.origin===origin&&['http:','https:'].includes(absolute.protocol)){absolute.hash='';absolute.search='';links.push(absolute.toString());}}catch{}});
   const audit:PageAudit={url:target,status:response.status,title:$('title').text().trim(),description:$('meta[name="description"]').attr('content')||'',h1:$('h1').length,canonical:$('link[rel="canonical"]').attr('href')||'',imagesMissingAlt:$('img').filter((_,el)=>!$(el).attr('alt')).length,links:[...new Set(links)]};
   pages.push(audit);
   for(const link of audit.links){if(!visited.has(link)&&queue.length<maxPages*3)queue.push(link);}
  }catch{
   pages.push({url:target,status:0,title:'',description:'',h1:0,canonical:'',imagesMissingAlt:0,links:[]});
  }
 }
 const root=pages[0]||{url:startUrl,status:0,title:'',description:'',h1:0,canonical:'',imagesMissingAlt:0,links:[]};
 const brokenLinks=pages.filter(p=>p.status>=400||p.status===0).map(p=>({url:p.url,status:p.status}));
 return {...root,robots:await robots(startUrl),pages,totalPages:pages.length,brokenLinks,crawlLimit:maxPages};
}
async function robots(url:string){try{const u=new URL('/robots.txt',url);const r=await fetch(u,{headers:{'user-agent':'LazyXTechSEOAudit/1.0'},signal:AbortSignal.timeout(8000)});return {status:r.status,content:await r.text()};}catch{return {status:0,content:''}}}
