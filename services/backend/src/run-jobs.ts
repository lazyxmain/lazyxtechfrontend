import mongoose from 'mongoose';
import {connectDb} from './db.js';
import {env} from './config.js';
import {Website,SEOAudit,Notification,AutomationSchedule,Blog} from './models.js';
import {crawl} from './seo.js';
import {getSearchConsoleSummary,searchConsoleConfigured} from './search-console.js';

async function main(){
 await connectDb();
 const now=new Date();
 await AutomationSchedule.updateOne({key:'worker-heartbeat'},{$set:{lastRunAt:now,lastStatus:'running',label:'Scheduled GitHub Actions runner'}},{upsert:true});
 try{
  const website=await Website.findOne({active:true});
  if(!website)throw new Error('No active website configured in the dashboard.');
  const result=await crawl(website.url);
  const issues:any[]=[];
  for(const page of result.pages||[]){
   if(!page.title)issues.push({type:'missing_title',severity:'high',url:page.url});
   if(!page.description)issues.push({type:'missing_meta_description',severity:'medium',url:page.url});
   if(page.h1!==1)issues.push({type:'h1_count',severity:'medium',url:page.url,details:{count:page.h1}});
   if(page.imagesMissingAlt)issues.push({type:'missing_alt',severity:'low',url:page.url,details:{count:page.imagesMissingAlt}});
   if(page.status>=400||page.status===0)issues.push({type:'http_status',severity:'high',url:page.url,details:{status:page.status}});
  }
  const score=Math.max(0,100-issues.filter(x=>x.severity==='high').length*10-issues.filter(x=>x.severity==='medium').length*5-issues.filter(x=>x.severity==='low').length*2);
  await SEOAudit.create({websiteId:website._id,startedAt:now,completedAt:new Date(),score,summary:result,issues});
  await Notification.create({type:'seo_audit',title:'Scheduled SEO audit completed',message:`Technical SEO score: ${score}/100. ${issues.length} issue(s) across ${result.totalPages} page(s).`,metadata:{score,issues:issues.length,pages:result.totalPages}});
  if(searchConsoleConfigured()){
   await getSearchConsoleSummary(28);
   await Notification.create({type:'gsc_sync',title:'Search Console check completed',message:'Google Search Console returned verified performance data.'});
  }else{
   await Notification.create({type:'integration_setup',title:'Search Console setup required',message:'Configure GOOGLE_SERVICE_ACCOUNT_JSON and GSC_PROPERTY_URL to enable verified search monitoring.'});
  }
  try{
   const latest:any=await SEOAudit.findOne().sort({createdAt:-1}).lean();
   const firstIssue=latest?.issues?.[0];
   const topic=firstIssue?'How to fix '+String(firstIssue.type).replace(/_/g,' ')+' on business websites':'Website development and technical SEO best practices for growing businesses';
   const response=await fetch((env.OLLAMA_BASE_URL.endsWith('/')?env.OLLAMA_BASE_URL.slice(0,-1):env.OLLAMA_BASE_URL)+'/api/generate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:env.OLLAMA_MODEL,stream:false,prompt:'Write an original, practical SEO blog article for LazyXTech about: '+topic+'. Return Markdown with a clear H1, introduction, H2 sections, practical examples, FAQ and conclusion. Do not invent statistics or make unsupported claims.'}),signal:AbortSignal.timeout(180000)});
   if(!response.ok)throw new Error('Local Ollama provider is unavailable');
   const generated:any=await response.json();const content=String(generated.response||'').trim();
   if(!content)throw new Error('AI returned an empty draft');
   const title=content.split(String.fromCharCode(10)).find((line:string)=>line.startsWith('# '))?.replace(/^# +/,'')||topic;
   const slug=title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,80)+'-'+Date.now().toString().slice(-6);
   const draft=await Blog.create({slug,title,excerpt:'Scheduled AI-assisted draft. Review and fact-check before publishing.',content,status:'draft',seo:{source:'scheduled-ollama',topic}});
   await Notification.create({type:'content_draft',title:'Scheduled blog draft ready for review',message:title,metadata:{blogId:draft._id,slug}});
  }catch(error:any){await Notification.create({type:'content_review',title:'AI content automation needs setup',message:String(error?.message||'Configure a reachable Ollama endpoint and model. No content was published.')});}
  await AutomationSchedule.updateOne({key:'technical-seo-daily'},{$set:{label:'Daily technical SEO crawl',cron:'30 2 * * *',lastRunAt:new Date(),lastStatus:'success',lastError:null}},{upsert:true});
  await AutomationSchedule.updateOne({key:'gsc-daily'},{$set:{label:'Google Search Console sync',cron:'30 2 * * *',lastRunAt:new Date(),lastStatus:searchConsoleConfigured()?'success':'error',lastError:searchConsoleConfigured()?null:'Search Console credentials are not configured.'}},{upsert:true});
  await AutomationSchedule.updateOne({key:'worker-heartbeat'},{$set:{lastRunAt:new Date(),lastStatus:'success',label:'Scheduled GitHub Actions runner'}},{upsert:true});
  console.log('LazyXTech scheduled SEO run completed.');
 }catch(error:any){
  await AutomationSchedule.updateOne({key:'worker-heartbeat'},{$set:{lastRunAt:new Date(),lastStatus:'error',lastError:String(error?.message||error)}},{upsert:true});
  await Notification.create({type:'automation_error',title:'Scheduled SEO run failed',message:String(error?.message||error)});
  throw error;
 }finally{await mongoose.disconnect();}
}
main().catch(error=>{console.error(error);process.exitCode=1;});
