import cron from 'node-cron';
import {connectDb} from './db.js';
import {AutomationSchedule,Website,SEOAudit,Notification,Blog,Competitor,Keyword} from './models.js';
import {crawl} from './seo.js';
import {getSearchConsoleSummary,searchConsoleConfigured} from './search-console.js';
import {env} from './config.js';
import {generateArticle} from './ai.js';

await connectDb();

const schedules=[
 {key:'technical-seo-daily',label:'Daily technical SEO crawl',cron:'0 2 * * *'},
 {key:'gsc-daily',label:'Google Search Console sync',cron:'30 2 * * *'},
 {key:'competitor-weekly',label:'Weekly competitor review',cron:'0 3 * * 1'},
 {key:'blog-every-3-days',label:'AI SEO content publishing',cron:'0 4 */3 * *'}
];

const seedKeywords=[
 'software development company Bhopal',
 'software company in Bhopal',
 'web development company Bhopal',
 'website development company Bhopal',
 'app development company Bhopal',
 'mobile app development company Bhopal',
 'React development company Bhopal',
 'Next.js development company Bhopal',
 'WordPress development company Bhopal',
 'Shopify development company Bhopal',
 'SEO company Bhopal',
 'website development company Madhya Pradesh',
 'software development company Madhya Pradesh'
];

async function heartbeat(){await AutomationSchedule.updateOne({key:'worker-heartbeat'},{$set:{lastRunAt:new Date(),lastStatus:'success',label:'Worker heartbeat'}},{upsert:true});}

async function execute(key:string,task:()=>Promise<void>){
 await AutomationSchedule.updateOne({key},{$set:{lastStartedAt:new Date(),lastStatus:'running',lastError:null}},{upsert:true});
 try{await task();await AutomationSchedule.updateOne({key},{$set:{lastRunAt:new Date(),lastStatus:'success',lastError:null}},{upsert:true});}
 catch(error:any){console.error('[worker]',key,error);await AutomationSchedule.updateOne({key},{$set:{lastRunAt:new Date(),lastStatus:'error',lastError:String(error?.message||error)}},{upsert:true});await Notification.create({type:'automation_error',title:'Automation failed',message:key+': '+String(error?.message||error)});}
}

async function technicalAudit(){
 const website=await Website.findOne({active:true});if(!website)throw new Error('No active website configured in the dashboard.');
 const result=await crawl(website.url);const issues:any[]=[];
 for(const page of result.pages||[]){if(!page.title)issues.push({type:'missing_title',severity:'high',url:page.url});if(!page.description)issues.push({type:'missing_meta_description',severity:'medium',url:page.url});if(page.h1!==1)issues.push({type:'h1_count',severity:'medium',url:page.url,details:{count:page.h1}});if(page.imagesMissingAlt)issues.push({type:'missing_alt',severity:'low',url:page.url,details:{count:page.imagesMissingAlt}});if(page.status>=400||page.status===0)issues.push({type:'http_status',severity:'high',url:page.url,details:{status:page.status}});}
 const score=Math.max(0,100-issues.filter(x=>x.severity==='high').length*10-issues.filter(x=>x.severity==='medium').length*5-issues.filter(x=>x.severity==='low').length*2);
 await SEOAudit.create({websiteId:website._id,startedAt:new Date(),completedAt:new Date(),score,summary:result,issues});
 await Notification.create({type:'seo_audit',title:'Daily SEO audit completed',message:`Technical SEO score: ${score}/100. ${issues.length} issue(s) detected.`,metadata:{score,issues:issues.length}});
}

async function syncSearchConsole(){
 if(!searchConsoleConfigured())throw new Error('Configure GOOGLE_SERVICE_ACCOUNT_JSON and GSC_PROPERTY_URL to sync Search Console.');
 const summary:any=await getSearchConsoleSummary(28);
 const rows=[...(summary.queries||[]),...(summary.opportunities||[])];
 for(const row of rows){
  const keyword=String(row.query||'').trim().toLowerCase();if(!keyword)continue;
  await Keyword.updateOne({keyword},{$set:{source:'google-search-console',intent:row.position!=null&&row.position<=10?'commercial/informational':'discovery',active:true},$setOnInsert:{keyword}},{upsert:true});
 }
 await Notification.create({type:'gsc_sync',title:'Search Console sync completed',message:`Synced ${rows.length} verified search queries into keyword tracking.`});
}

async function discoverAutocompleteKeywords(){
 const discovered=new Set(seedKeywords.map(x=>x.toLowerCase()));
 const serviceSeeds=['software development company Bhopal','web development company Bhopal','app development company Bhopal','WordPress development Bhopal','Shopify development Bhopal','SEO company Bhopal'];
 for(const seed of serviceSeeds){
  try{
   const r=await fetch('https://suggestqueries.google.com/complete/search?client=firefox&q='+encodeURIComponent(seed),{signal:AbortSignal.timeout(6000)});
   if(!r.ok)continue;
   const body:any=await r.json();
   for(const suggestion of body?.[1]||[])if(typeof suggestion==='string'&&suggestion.length<=120)discovered.add(suggestion.trim().toLowerCase());
  }catch{}
 }
 for(const keyword of [...discovered].slice(0,80)){
  await Keyword.updateOne({keyword},{$set:{source:'google-autocomplete+ai-seed',intent:keyword.includes('price')||keyword.includes('cost')?'commercial':'commercial/local',active:true},$setOnInsert:{keyword}},{upsert:true});
 }
 return [...discovered].slice(0,40);
}

async function contentReminder(){
 let summary:any=null;
 if(searchConsoleConfigured()){try{summary=await getSearchConsoleSummary(28);}catch{}}
 const opportunity=summary?.opportunities?.[0]?.query||summary?.queries?.[0]?.query;
 const discovered=await discoverAutocompleteKeywords();
 const topic=opportunity
  ?`How to choose a ${opportunity} for a growing business in Bhopal`
  :discovered[0]
   ?`What to look for in a ${discovered[0]}: a practical guide for Indian businesses`
   :'How to choose a software development company in Bhopal for your business';
 const generated=await generateArticle(topic);
 const content=generated.content;
 const title=content.split(String.fromCharCode(10)).find((line:string)=>line.startsWith('# '))?.replace(/^# +/,'')||topic;
 const slug=title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,80)+'-'+Date.now().toString().slice(-6);
 const draft=await Blog.create({slug,title,excerpt:'AI-generated SEO article based on current search opportunities. Review before making business-critical claims.',content,status:'published',publishedAt:new Date(),seo:{source:generated.provider.toLowerCase(),model:generated.model,topic,targetKeywords:discovered.slice(0,12),gscOpportunity:opportunity||null}});
 await Notification.create({type:'content_published',title:'Scheduled SEO blog published',message:title,metadata:{blogId:draft._id,slug,provider:generated.provider,targetKeywords:discovered.slice(0,12)}});
}

async function runCompetitorReview(){
 const items=await Competitor.find();if(!items.length){await Notification.create({type:'competitor_setup',title:'Competitor watchlist is empty',message:'Add up to five competitor domains in the dashboard to start weekly monitoring.'});return;}
 let checked=0,failed=0;
 for(const item of items){try{const result=await crawl(String(item.url||''));item.title=result.title;item.description=result.description;item.status=result.status>=200&&result.status<400?'reachable':'issue';item.lastCheckedAt=new Date();item.lastError=undefined;await item.save();checked++;}catch(error:any){item.status='error';item.lastCheckedAt=new Date();item.lastError=String(error?.message||error);await item.save();failed++;}}
 await Notification.create({type:'competitor_review',title:'Weekly competitor website check completed',message:`Checked ${checked} competitor site(s); ${failed} had errors. This is public technical metadata monitoring, not competitor Google ranking data.`});
}

await Promise.all(schedules.map(s=>AutomationSchedule.updateOne({key:s.key},{$set:{label:s.label,cron:s.cron,enabled:true}},{upsert:true})));
await heartbeat();
cron.schedule('* * * * *',()=>heartbeat().catch(console.error));
cron.schedule('0 2 * * *',()=>execute('technical-seo-daily',technicalAudit));
cron.schedule('30 2 * * *',()=>execute('gsc-daily',syncSearchConsole));
cron.schedule('0 3 * * 1',()=>execute('competitor-weekly',runCompetitorReview));
cron.schedule('0 4 */3 * *',()=>execute('blog-every-3-days',contentReminder));
console.log('LazyXTech worker started; scheduled SEO monitoring and content automation are active.');
void execute('technical-seo-daily',technicalAudit).catch(error=>console.error('[worker] startup audit failed',error));
