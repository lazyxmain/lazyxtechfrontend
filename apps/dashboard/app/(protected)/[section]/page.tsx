'use client';

import {useCallback,useEffect,useState} from 'react';
import {Activity,AlertCircle,ArrowUpRight,CheckCircle2,Clock3,ExternalLink,FileSearch,Gauge,RefreshCw,Search,ShieldCheck,Zap,Bot,Database} from 'lucide-react';

type Payload = Record<string, any>;
const descriptions:Record<string,[string,string]> = {
  seo:['SEO performance','Verified organic search performance from Google Search Console.'],
  keywords:['Keyword tracking','Monitor search queries and ranking opportunities.'],
  audit:['Technical SEO audit','Crawl your website and track technical SEO issues.'],
  speed:['Website performance','Core Web Vitals and Lighthouse performance checks.'],
  competitors:['Competitor monitoring','Competitor tracking will appear when targets are configured.'],
  content:['AI content studio','Create SEO-focused drafts with the configured AI provider.'],
  blog:['Blog manager','Review, edit and approve content before publishing.'],
  leads:['Leads','Review inbound website enquiries.'],
  notifications:['Notifications','System alerts, audit results and automation notices.'],
  agents:['AI agents','AI provider availability and agent health.'],
  automation:['Automation monitor','Scheduled jobs, recent runs and worker health.'],
  reports:['Reports','SEO and website health summaries.'],
  settings:['Integrations & settings','Configure Google Search Console, AI and website monitoring.']
};

async function request(path:string,options:RequestInit={}):Promise<Payload>{
  const response=await fetch('/api'+path,{credentials:'include',...options});
  const body=await response.json().catch(()=>({}));
  if(!response.ok) throw new Error(body.error||'Unable to load data');
  return body;
}

export default function Section({params}:{params:{section:string}}){
  const section=params.section;
  const [data,setData]=useState<Payload|null>(null);
  const [loading,setLoading]=useState(true);
  const [running,setRunning]=useState(false);
  const [error,setError]=useState('');
  const [updated,setUpdated]=useState('');
  const [range,setRange]=useState('28');
  const [topic,setTopic]=useState('');
  const [notice,setNotice]=useState('');
  const [refreshKey,setRefreshKey]=useState(0);
  const [title,description]=descriptions[section]||['Workspace','LazyXTech Command Center'];

  const load=useCallback(async()=>{
    setLoading(true);setError('');setNotice('');
    try{
      let result:Payload={};
      if(section==='seo') result=await request('/search-console/summary?days='+range);
      else if(section==='audit') result=await request('/audits/latest');
      else if(section==='automation') result=await request('/automation/status');
      else if(section==='agents') result=await request('/ai/status');
      else if(section==='notifications') result=await request('/notifications');
      else if(section==='leads') result=await request('/leads');
      else if(section==='speed') result=await request('/automation/status');
      else if(section==='settings') result=await request('/integrations/status');
      else result=await request('/overview');
      setData(result);setUpdated(new Date().toLocaleTimeString());
    }catch(e:any){setError(e.message||'Could not load this module');}
    finally{setLoading(false);}
  },[section,range]);

  useEffect(()=>{load();},[load,refreshKey]);

  const runAction=async(kind:'audit'|'speed'|'draft')=>{
    setRunning(true);setError('');setNotice('');
    try{
      if(kind==='audit'){await request('/audits/run',{method:'POST'});setNotice('Technical SEO audit completed.');}
      if(kind==='speed'){const result=await request('/pagespeed');setData(result);setNotice('PageSpeed check completed.');}
      if(kind==='draft'){
        if(!topic.trim()) throw new Error('Enter a blog topic first.');
        await request('/ai/blog-draft',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({topic})});
        setTopic('');setNotice('Draft created. Review it in Blog Manager before publishing.');
      }
      if(kind!=='speed') setRefreshKey(v=>v+1);
    }catch(e:any){setError(e.message||'Action failed');}
    finally{setRunning(false);}
  };

  return <div className="page">
    <div className="page-head">
      <div><p className="eyebrow">LAZYXTECH / MODULE</p><h2>{title}</h2><p className="muted">{description}</p></div>
      <div className="page-actions">
        {section==='audit'&&<button className="primary" onClick={()=>runAction('audit')} disabled={running}><RefreshCw size={15}/>{running?'Running audit…':'Run audit'}</button>}
        {section==='speed'&&<button className="primary" onClick={()=>runAction('speed')} disabled={running}><Gauge size={15}/>{running?'Testing…':'Run PageSpeed'}</button>}
        <button className="icon-btn" onClick={()=>setRefreshKey(v=>v+1)} aria-label="Refresh module"><RefreshCw size={16}/></button>
      </div>
    </div>

    {error&&<div className="notice notice-error"><AlertCircle size={17}/>{error}</div>}
    {notice&&<div className="notice notice-success"><CheckCircle2 size={17}/>{notice}</div>}
    <div className="module-meta"><span><span className="live-dot"/> Backend connected</span><span>Updated {updated||'—'}</span></div>

    {loading?<div className="panel loading-panel">Loading verified module data…</div>:null}
    {!loading&&section==='seo'&&<SEOView data={data||{}} range={range} onRange={setRange} onRefresh={()=>setRefreshKey(v=>v+1)}/>}
    {!loading&&section==='audit'&&<AuditView data={data||{}}/>}
    {!loading&&(section==='automation'||section==='speed')&&<AutomationView data={data||{}} speed={section==='speed'}/>}
    {!loading&&section==='agents'&&<AgentsView data={data||{}}/>}
    {!loading&&section==='settings'&&<SettingsView data={data||{}}/>}
    {!loading&&section==='content'&&<section className="panel content-generator"><div className="panel-heading"><div><h3>AI-assisted blog draft</h3><p className="muted">Drafts are saved for review. Nothing is published automatically.</p></div><Bot/></div><label className="field-label" htmlFor="blog-topic">Blog topic</label><input id="blog-topic" className="text-input" value={topic} onChange={e=>setTopic(e.target.value)} placeholder="e.g. How to choose a website development partner"/><button className="primary" onClick={()=>runAction('draft')} disabled={running||!topic.trim()}>{running?'Generating…':'Generate draft'}</button><p className="muted small">Requires a reachable Ollama instance and a configured model. No paid AI API is required.</p></section>}
    {!loading&&!['seo','audit','automation','speed','agents','settings','content'].includes(section)&&<GenericView section={section} data={data||{}}/>}
  </div>;
}

function Metric({label,value,detail,icon:Icon}:{label:string,value:string,detail:string,icon:any}){
 return <div className="metric-card"><div className="metric-top"><span>{label}</span><Icon size={17}/></div><strong>{value}</strong><small>{detail}</small></div>;
}
function SEOView({data,range,onRange,onRefresh}:{data:Payload,range:string,onRange:(v:string)=>void,onRefresh:()=>void}){
 const metrics=data.metrics||{};
 if(!data.connected) return <div className="panel integration-empty"><div className="empty-icon"><Search size={24}/></div><span className="status-pill status-pending">Connection required</span><h3>Connect Google Search Console</h3><p className="muted">Your SEO dashboard is ready, but Google has not supplied verified search data yet. Connect a Search Console property to populate clicks, impressions, CTR, rankings and top queries.</p><div className="setup-steps"><div><b>1</b><span>Add the service account email as a user in your Search Console property.</span></div><div><b>2</b><span>Add the service account JSON to the backend environment as GOOGLE_SERVICE_ACCOUNT_JSON.</span></div><div><b>3</b><span>Set GSC_PROPERTY_URL to the exact verified property, then refresh this page.</span></div></div><div className="integration-foot"><ShieldCheck size={16}/> No sample numbers are displayed as real analytics.</div></div>;
 return <><div className="toolbar"><div className="status-pill status-live"><span className="live-dot"/> Search Console connected</div><select className="select-input" value={range} onChange={e=>onRange(e.target.value)}><option value="7">Last 7 days</option><option value="28">Last 28 days</option><option value="90">Last 3 months</option></select></div><div className="metric-grid"><Metric label="Total clicks" value={formatNumber(metrics.clicks)} detail="Organic Google clicks" icon={Activity}/><Metric label="Impressions" value={formatNumber(metrics.impressions)} detail="Search appearances" icon={Search}/><Metric label="Average CTR" value={metrics.ctr==null?'—':(metrics.ctr*100).toFixed(2)+'%'} detail="Click-through rate" icon={ArrowUpRight}/><Metric label="Average position" value={metrics.position==null?'—':Number(metrics.position).toFixed(1)} detail="Average search position" icon={Gauge}/></div><div className="two-col"><section className="panel"><div className="panel-heading"><div><h3>Top search queries</h3><p className="muted">Queries bringing visitors from Google</p></div><Search/></div><DataRows rows={data.queries||[]} nameKey="query" valueKey="clicks" empty="No query data for this date range."/></section><section className="panel"><div className="panel-heading"><div><h3>Top landing pages</h3><p className="muted">Pages appearing in search results</p></div><FileSearch/></div><DataRows rows={data.pages||[]} nameKey="page" valueKey="clicks" empty="No page data for this date range."/></section></div><p className="data-foot">Property: {data.property} · Data through {data.range?.endDate||'—'} · Source: Google Search Console</p></>;
}
function DataRows({rows,nameKey,valueKey,empty}:{rows:Payload[],nameKey:string,valueKey:string,empty:string}){
 if(!rows.length)return <div className="table-empty">{empty}</div>;
 return <div className="data-rows">{rows.slice(0,8).map((row,i)=><div className="data-row" key={row[nameKey]||i}><span title={row[nameKey]}>{row[nameKey]}</span><b>{formatNumber(row[valueKey])}</b></div>)}</div>;
}
function AuditView({data}:{data:Payload}){
 if(!data||!data._id)return <div className="panel integration-empty"><div className="empty-icon"><ShieldCheck/></div><h3>No technical audit yet</h3><p className="muted">Run your first crawl to check page titles, meta descriptions, headings, canonical URLs, image alt text and robots.txt.</p></div>;
 return <><div className="metric-grid"><Metric label="SEO score" value={data.score==null?'—':data.score+'/100'} detail="Rule-based technical score" icon={Gauge}/><Metric label="Issues found" value={formatNumber(data.issues?.length||0)} detail="Across the latest crawl" icon={AlertCircle}/><Metric label="HTTP status" value={String(data.summary?.status??'—')} detail="Homepage response" icon={Activity}/><Metric label="Last crawl" value={data.completedAt?new Date(data.completedAt).toLocaleDateString():'—'} detail="Most recent audit" icon={Clock3}/></div><section className="panel"><h3>Detected issues</h3>{(data.issues||[]).length?<DataRows rows={data.issues.map((x:any)=>({query:x.type||'SEO issue',clicks:x.severity||'info'}))} nameKey="query" valueKey="clicks" empty="No issues found."/>:<div className="table-empty">No issues found in the latest audit.</div>}</section></>;
}
function AutomationView({data,speed}:{data:Payload,speed:boolean}){
 if(speed&&data.performance!==undefined)return <div className="metric-grid"><Metric label="Performance" value={data.performance==null?'—':data.performance+'/100'} detail="Lighthouse score" icon={Gauge}/><Metric label="SEO" value={data.seo==null?'—':data.seo+'/100'} detail="Lighthouse score" icon={Search}/><Metric label="Accessibility" value={data.accessibility==null?'—':data.accessibility+'/100'} detail="Lighthouse score" icon={ShieldCheck}/><Metric label="Best practices" value={data.bestPractices==null?'—':data.bestPractices+'/100'} detail="Lighthouse score" icon={CheckCircle2}/></div>;
 const schedules=data.schedules||[];
 return <><div className="metric-grid"><Metric label="Worker status" value={data.worker?.status==='online'?'Online':'Unknown'} detail={data.worker?.lastHeartbeat?'Heartbeat received':'No heartbeat received'} icon={Activity}/><Metric label="Scheduled jobs" value={String(schedules.length)} detail="Configured automation schedules" icon={Clock3}/><Metric label="Successful runs" value={String(schedules.filter((x:any)=>x.lastStatus==='success').length)} detail="Latest recorded status" icon={CheckCircle2}/><Metric label="Failed runs" value={String(schedules.filter((x:any)=>x.lastStatus==='error').length)} detail="Latest recorded status" icon={AlertCircle}/></div><section className="panel"><div className="panel-heading"><div><h3>Automation schedules</h3><p className="muted">Live state from the backend worker</p></div><Zap/></div>{schedules.length?<div className="schedule-list">{schedules.map((job:any)=><div className="schedule-row" key={job.key}><div><b>{job.label||job.key}</b><small>{job.cron||'Scheduled job'} · {job.lastRunAt?'Last run '+new Date(job.lastRunAt).toLocaleString():'Not run yet'}</small></div><span className={'status-pill '+(job.lastStatus==='success'?'status-live':job.lastStatus==='error'?'status-error':'status-pending')}>{job.lastStatus||'Waiting'}</span></div>)}</div>:<div className="table-empty">No worker heartbeat or schedules have been reported yet. Confirm the Render worker service is running.</div>}</section></>;
}
function AgentsView({data}:{data:Payload}){
 return <div className="panel agent-card"><div className="agent-icon"><Bot size={24}/></div><div><span className={'status-pill '+(data.available?'status-live':'status-pending')}>{data.available?'AI provider online':'AI provider unavailable'}</span><h3>{data.provider||'Local Ollama'}</h3><p className="muted">{data.message||'AI provider health has not been checked.'}</p><small>Model: {data.model||'Not configured'}</small></div></div>;
}
function SettingsView({data}:{data:Payload}){
 const integrations=data.integrations||[];
 return <section className="panel"><div className="panel-heading"><div><h3>Connected services</h3><p className="muted">Credentials stay on the backend; never paste secrets into the dashboard.</p></div><Database/></div><div className="schedule-list">{integrations.map((item:any)=><div className="schedule-row" key={item.key}><div><b>{item.name}</b><small>{item.description}</small></div><span className={'status-pill '+(item.configured?'status-live':'status-pending')}>{item.configured?'Configured':'Needs setup'}</span></div>)}</div></section>;
}
function GenericView({section,data}:{section:string,data:Payload}){
 const messages:Record<string,string>={keywords:'Keyword tracking will become active after Search Console data and target keywords are configured.',competitors:'Add competitor domains before monitoring can start.',blog:'Blog drafts and publishing approvals will be managed here.',leads:'Lead records will appear here when your website form submits to the backend.',notifications:'System and automation alerts will appear here.',reports:'Reports are generated from completed SEO audits and connected analytics.'};
 return <section className="panel integration-empty"><div className="empty-icon"><Activity/></div><h3>{descriptions[section]?.[0]||'Module setup'}</h3><p className="muted">{messages[section]||'This module is not configured yet.'}</p><span className="integration-foot">The dashboard will only show data returned by connected services.</span></section>;
}
function formatNumber(value:any){return value==null?'—':Number(value).toLocaleString('en-IN',{maximumFractionDigits:2});}
