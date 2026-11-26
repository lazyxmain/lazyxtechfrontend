import {google} from 'googleapis';
import {env} from './config.js';

export function searchConsoleConfigured(){return Boolean(env.GOOGLE_SERVICE_ACCOUNT_JSON&&env.GSC_PROPERTY_URL);}
export async function getSearchConsoleSummary(days:number){
 if(!searchConsoleConfigured())return {connected:false,property:env.GSC_PROPERTY_URL,metrics:{clicks:null,impressions:null,ctr:null,position:null},queries:[],pages:[],message:'Google Search Console service account is not configured.'};
 let credentials:any;
 try{credentials=JSON.parse(env.GOOGLE_SERVICE_ACCOUNT_JSON);}catch{throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON must contain valid service-account JSON.');}
 const auth=new google.auth.GoogleAuth({credentials,scopes:['https://www.googleapis.com/auth/webmasters.readonly']});
 const client=google.searchconsole({version:'v1',auth});
 const end=new Date();end.setDate(end.getDate()-2);
 const start=new Date(end);start.setDate(start.getDate()-Math.max(1,Math.min(days,90))+1);
 const fmt=(d:Date)=>d.toISOString().slice(0,10);
 const dateRange={startDate:fmt(start),endDate:fmt(end)};
 const [totals,queries,pages]=await Promise.all([
  client.searchanalytics.query({siteUrl:env.GSC_PROPERTY_URL,requestBody:{...dateRange,rowLimit:1}}),
  client.searchanalytics.query({siteUrl:env.GSC_PROPERTY_URL,requestBody:{...dateRange,dimensions:['query'],rowLimit:10}}),
  client.searchanalytics.query({siteUrl:env.GSC_PROPERTY_URL,requestBody:{...dateRange,dimensions:['page'],rowLimit:10}})
 ]);
 const row=totals.data.rows?.[0];
 return {connected:true,property:env.GSC_PROPERTY_URL,range:dateRange,metrics:{clicks:row?.clicks??0,impressions:row?.impressions??0,ctr:row?.ctr??0,position:row?.position??null},queries:(queries.data.rows||[]).map(x=>({query:x.keys?.[0]||'',clicks:x.clicks??0,impressions:x.impressions??0,ctr:x.ctr??0,position:x.position??null})),pages:(pages.data.rows||[]).map(x=>({page:x.keys?.[0]||'',clicks:x.clicks??0,impressions:x.impressions??0,ctr:x.ctr??0,position:x.position??null}))};
}
