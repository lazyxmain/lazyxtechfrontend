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
  const [data,setData]=useState<any>(null);
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
      if(section==='seo'||section==='keywords') result=await request('/search-console/summary?days='+range);
      else if(section==='audit') result=await request('/audits/latest');
      else if(section==='automation') result=await request('/automation/status');
      else if(section==='agents') result=await request('/ai/status');
      else if(section==='notifications') result=await request('/notifications');
      else if(section==='blog') result=await request('/blogs');
      else if(section==='leads') result=await request('/leads');
      else if(section==='speed') result=await request('/pagespeed');
      else if(section==='settings') result=await request('/integrations/status');
      else if(section==='competitors') result=await request('/competitors');
      else if(section==='reports') {const [audit,gsc,automation]=await Promise.all([request('/audits/latest'),request('/search-console/summary?days=28'),request('/automation/status')]);result={audit,gsc,automation};}
      else result=await request('/notifications');
      setData(result);setUpdated(new Date().toLocaleTimeString('en-IN',{timeZone:'Asia/Kolkata'}));
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
    <div className="module-meta"><span><span className="live-dot"/> Live backend data</span><span>Updated {updated||'—'}</span></div>

    {loading?<div className="panel loading-panel">Loading verified module data…</div>:null}
    {!loading&&(section==='seo'||section==='keywords')&&<SEOView data={data||{}} range={range} onRange={setRange} onRefresh={()=>setRefreshKey(v=>v+1)}/>}
    {!loading&&section==='audit'&&<AuditView data={data||{}}/>}
    {!loading&&(section==='automation'||section==='speed')&&<AutomationView data={data||{}} speed={section==='speed'}/>}
    {!loading&&section==='agents'&&<AgentsView data={data||{}}/>}
    {!loading&&section==='settings'&&<SettingsView data={data||{}}/>}
    {!loading&&section==='competitors'&&<CompetitorsView data={data||{}} onRefresh={()=>setRefreshKey(v=>v+1)}/>}
    {!loading&&section==='reports'&&<ReportsView data={data||{}}/>}
    {!loading&&section==='blog'&&<BlogView data={data||[]} onRefresh={()=>setRefreshKey(v=>v+1)}/>}
    {!loading&&section==='notifications'&&<NotificationsView data={data||[]}/>}
    {!loading&&section==='leads'&&<LeadsView data={data||{}}/>}
    {!loading&&section==='content'&&<section className="panel content-generator"><div className="panel-heading"><div><h3>AI-assisted blog draft</h3><p className="muted">Drafts are saved for review. Nothing is published automatically.</p></div><Bot/></div><label className="field-label" htmlFor="blog-topic">Blog topic</label><input id="blog-topic" className="text-input" value={topic} onChange={e=>setTopic(e.target.value)} placeholder="e.g. How to choose a website development partner"/><button className="primary" onClick={()=>runAction('draft')} disabled={running||!topic.trim()}>{running?'Generating…':'Generate draft'}</button><p className="muted small">Requires a reachable Ollama instance and a configured model. No paid AI API is required.</p><button className="secondary" onClick={()=>location.assign('/blog')}>Open blog review queue</button></section>}
    {!loading&&!['seo','keywords','audit','automation','speed','agents','settings','content','competitors','reports','blog','notifications','leads'].includes(section)&&<GenericView section={section} data={data||{}}/>}
  </div>;
}

function Metric({label,value,detail,icon:Icon}:{label:string,value:string,detail:string,icon:any}){
 return <div className="metric-card"><div className="metric-top"><span>{label}</span><Icon size={17}/></div><strong>{value}</strong><small>{detail}</small></div>;
}
function SEOView({data,range,onRange,onRefresh}:{data:Payload,range:string,onRange:(v:string)=>void,onRefresh:()=>void}){
 const metrics=data.metrics||{};
 if(!data.connected) return <div className="panel integration-empty"><div className="empty-icon"><Search size={24}/></div><span className="status-pill status-pending">Connection required</span><h3>Connect Google Search Console</h3><p className="muted">Your SEO dashboard is ready, but Google has not supplied verified search data yet. Connect a Search Console property to populate clicks, impressions, CTR, rankings and top queries.</p><div className="setup-steps"><div><b>1</b><span>Add the service account email as a user in your Search Console property.</span></div><div><b>2</b><span>Add the service account JSON to the backend environment as GOOGLE_SERVICE_ACCOUNT_JSON.</span></div><div><b>3</b><span>Set GSC_PROPERTY_URL to the exact verified property, then refresh this page.</span></div></div><div className="integration-foot"><ShieldCheck size={16}/> No sample numbers are displayed as real analytics.</div></div>;
 return <><div className="toolbar"><div className="status-pill status-live"><span className="live-dot"/> Search Console connected</div><select className="select-input" value={range} onChange={e=>onRange(e.target.value)}><option value="7">Last 7 days</option><option value="28">Last 28 days</option><option value="90">Last 3 months</option></select></div><div className="metric-grid"><Metric label="Total clicks" value={formatNumber(metrics.clicks)} detail="Organic Google clicks" icon={Activity}/><Metric label="Impressions" value={formatNumber(metrics.impressions)} detail="Search appearances" icon={Search}/><Metric label="Average CTR" value={metrics.ctr==null?'—':(metrics.ctr*100).toFixed(2)+'%'} detail="Click-through rate" icon={ArrowUpRight}/><Metric label="Average position" value={metrics.position==null?'—':Number(metrics.position).toFixed(1)} detail="Average search position" icon={Gauge}/></div><div className="two-col"><section className="panel"><div className="panel-heading"><div><h3>Top search queries & ranking opportunities</h3><p className="muted">Prioritise relevant queries ranking just outside page one</p></div><Search/></div><DataRows rows={data.queries||[]} nameKey="query" valueKey="clicks" secondaryKey="position" empty="No query data for this date range."/></section><section className="panel"><div className="panel-heading"><div><h3>Top landing pages</h3><p className="muted">Pages appearing in search results</p></div><FileSearch/></div><DataRows rows={data.pages||[]} nameKey="page" valueKey="clicks" empty="No page data for this date range."/></section></div><p className="data-foot">Property: {data.property} · Data through {data.range?.endDate||'—'} · Source: Google Search Console</p></>;
}
function DataRows({rows,nameKey,valueKey,secondaryKey,empty}:{rows:Payload[],nameKey:string,valueKey:string,secondaryKey?:string,empty:string}){
 if(!rows.length)return <div className="table-empty">{empty}</div>;
 return <div className="data-rows">{rows.slice(0,10).map((row,i)=><div className="data-row" key={row[nameKey]||i}><span title={row[nameKey]}>{row[nameKey]}{secondaryKey&&row[secondaryKey]!=null?<small className="row-sub">Avg position {Number(row[secondaryKey]).toFixed(1)}</small>:null}</span><b>{formatNumber(row[valueKey])}</b></div>)}</div>;
}
function AuditView({data}:{data:Payload}){
 if(!data||!data._id)return <div className="panel integration-empty"><div className="empty-icon"><ShieldCheck/></div><h3>No technical audit yet</h3><p className="muted">Run your first crawl to check page titles, meta descriptions, headings, canonical URLs, image alt text and robots.txt.</p></div>;
 return <><div className="metric-grid"><Metric label="SEO score" value={data.score==null?'—':data.score+'/100'} detail="Rule-based technical score" icon={Gauge}/><Metric label="Issues found" value={formatNumber(data.issues?.length||0)} detail="Across the latest crawl" icon={AlertCircle}/><Metric label="HTTP status" value={String(data.summary?.status??'—')} detail="Homepage response" icon={Activity}/><Metric label="Last crawl" value={data.completedAt?new Date(data.completedAt).toLocaleDateString():'—'} detail="Most recent audit" icon={Clock3}/></div><section className="panel"><h3>Detected issues</h3>{(data.issues||[]).length?<DataRows rows={data.issues.map((x:any)=>({query:x.type||'SEO issue',clicks:x.severity||'info'}))} nameKey="query" valueKey="clicks" empty="No issues found."/>:<div className="table-empty">No issues found in the latest audit.</div>}</section></>;
}
function AutomationView({data,speed}:{data:Payload,speed:boolean}){
 if(speed&&data.performance!==undefined)return <><div className="metric-grid"><Metric label="Performance" value={data.performance==null?'—':data.performance+'/100'} detail="Lighthouse score" icon={Gauge}/><Metric label="SEO" value={data.seo==null?'—':data.seo+'/100'} detail="Lighthouse score" icon={Search}/><Metric label="Accessibility" value={data.accessibility==null?'—':data.accessibility+'/100'} detail="Lighthouse score" icon={ShieldCheck}/><Metric label="Best practices" value={data.bestPractices==null?'—':data.bestPractices+'/100'} detail="Lighthouse score" icon={CheckCircle2}/></div><section className="panel"><h3>Core Web Vitals & lab signals</h3><div className="overview-stats"><div><small>Largest Contentful Paint</small><b>{data.coreWebVitals?.lcp||'—'}</b></div><div><small>Cumulative Layout Shift</small><b>{data.coreWebVitals?.cls||'—'}</b></div><div><small>Interaction to Next Paint</small><b>{data.coreWebVitals?.inp||'—'}</b></div></div><p className="muted small">Source: Google PageSpeed Insights / Lighthouse · {data.url||''}</p></section></>;
 const schedules=data.schedules||[];
 return <><div className="metric-grid"><Metric label="Worker status" value={data.worker?.status||'offline'} detail={data.worker?.lastHeartbeat?'Heartbeat '+new Date(data.worker.lastHeartbeat).toLocaleString():'No heartbeat received'} icon={Activity}/><Metric label="Scheduled jobs" value={String(schedules.length)} detail="Configured automation schedules" icon={Clock3}/><Metric label="Successful runs" value={String(schedules.filter((x:any)=>x.lastStatus==='success').length)} detail="Latest recorded status" icon={CheckCircle2}/><Metric label="Failed runs" value={String(schedules.filter((x:any)=>x.lastStatus==='error').length)} detail="Latest recorded status" icon={AlertCircle}/></div><div className="two-col"><section className="panel"><div className="panel-heading"><div><h3>What the bot is doing</h3><p className="muted">Live task state reported by the worker</p></div><Bot/></div>{data.currentTask?<><b>{data.currentTask.label}</b><p className="muted">Started {data.currentTask.lastStartedAt?new Date(data.currentTask.lastStartedAt).toLocaleString():'recently'}</p></>:<><b>{data.worker?.status==='online'?'Monitoring and waiting for the next scheduled task':'Worker is not reporting as online'}</b><p className="muted">{data.worker?.lastError||'Heartbeat updates every minute while the Render worker is running.'}</p></>}<div className="data-foot">Last heartbeat: {data.worker?.lastHeartbeat?new Date(data.worker.lastHeartbeat).toLocaleString():'Not received'}</div></section><section className="panel"><div className="panel-heading"><div><h3>Next scheduled task</h3><p className="muted">What the bot is expected to do next</p></div><Clock3/></div>{data.nextTask?<><b>{data.nextTask.label}</b><p className="muted">Schedule: {data.nextTask.cron} (UTC)</p><small className="muted">Scheduled according to the worker's UTC clock.</small></>:<div className="table-empty">No next task is scheduled.</div>}</section></div><section className="panel"><div className="panel-heading"><div><h3>Automation schedules & run history</h3><p className="muted">Live state from the backend worker</p></div><Zap/></div>{schedules.length?<div className="schedule-list">{schedules.map((job:any)=><div className="schedule-row" key={job.key}><div><b>{job.label||job.key}</b><small>{job.cron||'Scheduled job'} · {job.lastRunAt?'Last run '+new Date(job.lastRunAt).toLocaleString():'Not run yet'}{job.lastError?' · '+job.lastError:''}</small></div><span className={'status-pill '+(job.lastStatus==='success'?'status-live':job.lastStatus==='error'?'status-error':'status-pending')}>{job.lastStatus||'Waiting'}</span></div>)}</div>:<div className="table-empty">No worker heartbeat or schedules have been reported yet. Confirm the Render worker service is running.</div>}</section></>;
}
function AgentsView({data}:{data:Payload}){
 return <div className="panel agent-card"><div className="agent-icon"><Bot size={24}/></div><div><span className={'status-pill '+(data.available?'status-live':'status-pending')}>{data.available?'AI provider online':'AI provider unavailable'}</span><h3>{data.provider||'Local Ollama'}</h3><p className="muted">{data.message||'AI provider health has not been checked.'}</p><small>Model: {data.model||'Not configured'}</small></div></div>;
}
function SettingsView({data}:{data:Payload}){
 const integrations=data.integrations||[];
 return <section className="panel"><div className="panel-heading"><div><h3>Connected services</h3><p className="muted">Credentials stay on the backend; never paste secrets into the dashboard.</p></div><Database/></div><div className="schedule-list">{integrations.map((item:any)=><div className="schedule-row" key={item.key}><div><b>{item.name}</b><small>{item.description}</small></div><span className={'status-pill '+(item.configured?'status-live':'status-pending')}>{item.configured?'Configured':'Needs setup'}</span></div>)}</div></section>;
}
function BlogView({data,onRefresh}:{data:Payload[],onRefresh:()=>void}){
 const [busy,setBusy]=useState('');
 const approve=async(id:string)=>{setBusy(id);try{await request('/blogs/'+id+'/approve',{method:'POST'});onRefresh();}catch(e:any){alert(e.message||'Could not approve draft');}finally{setBusy('');}};
 return <section className="panel"><div className="panel-heading"><div><h3>Content review queue</h3><p className="muted">Review SEO titles, article structure and accuracy before approval. Approval does not publish to the public website until a CMS publishing connection is configured.</p></div><FileSearch/></div>
 {data.length?<div className="blog-list">{data.map((blog:any)=><article className="blog-card" key={blog._id}><div className="blog-card-head"><div><h4>{blog.title}</h4><p className="muted">{blog.excerpt||'No excerpt'} · {blog.createdAt?new Date(blog.createdAt).toLocaleString():''}</p></div><span className={'status-pill '+(blog.status==='approved'?'status-live':'status-pending')}>{blog.status}</span></div><details><summary>Preview article</summary><pre className="blog-preview">{blog.content||'No content saved.'}</pre></details>{blog.status==='draft'&&<button className="primary" disabled={!!busy} onClick={()=>approve(blog._id)}>{busy===blog._id?'Approving…':'Approve reviewed draft'}</button>}</article>)}</div>:<div className="table-empty">No blog drafts yet. Use AI Content to generate your first draft.</div>}
 </section>;
}
function NotificationsView({data}:{data:Payload[]}){
 return <section className="panel"><div className="panel-heading"><div><h3>Recent system activity</h3><p className="muted">SEO audits, worker errors and content review alerts</p></div><Activity/></div>
 {data.length?<div className="schedule-list">{data.map((item:any)=><div className="schedule-row" key={item._id}><div><b>{item.title||item.type}</b><small>{item.message} · {new Date(item.createdAt).toLocaleString()}</small></div><span className="status-pill status-pending">{item.type}</span></div>)}</div>:<div className="table-empty">No notifications yet.</div>}
 </section>;
}
function LeadsView({data}:{data:Payload}){
 const items=data.items||[];
 return <section className="panel"><div className="panel-heading"><div><h3>Website enquiries</h3><p className="muted">Latest leads submitted through your website</p></div><Activity/></div>
 {items.length?<div className="schedule-list">{items.map((lead:any)=><div className="schedule-row" key={lead._id}><div><b>{lead.name||'Website visitor'} · {lead.service||'General enquiry'}</b><small>{lead.email||'No email'} · {lead.message||''}</small></div><span className="status-pill status-pending">{lead.status||'new'}</span></div>)}</div>:<div className="table-empty">No leads received yet.</div>}
 </section>;
}
function GenericView({section,data}:{section:string,data:Payload}){
 const messages:Record<string,string>={keywords:'Keyword tracking will become active after Search Console data and target keywords are configured.',competitors:'Add competitor domains before monitoring can start.',blog:'Blog drafts and publishing approvals will be managed here.',leads:'Lead records will appear here when your website form submits to the backend.',notifications:'System and automation alerts will appear here.',reports:'Reports are generated from completed SEO audits and connected analytics.'};
 return <section className="panel integration-empty"><div className="empty-icon"><Activity/></div><h3>{descriptions[section]?.[0]||'Module setup'}</h3><p className="muted">{messages[section]||'This module is not configured yet.'}</p><span className="integration-foot">The dashboard will only show data returned by connected services.</span></section>;
}

function CompetitorsView({data,onRefresh}:{data:Payload,onRefresh:()=>void}){
 const [domain,setDomain]=useState('');const [busy,setBusy]=useState(false);const [message,setMessage]=useState('');
 const add=async()=>{const value=domain.trim();if(!value)return;setBusy(true);setMessage('');try{await request('/competitors',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({domain:value})});setDomain('');setMessage('Competitor domain saved.');onRefresh()}catch(e:any){setMessage(e.message||'Could not save competitor')}finally{setBusy(false)}};
 const check=async(id:string)=>{setBusy(true);setMessage('Checking public website metadata…');try{await request('/competitors/'+id+'/check',{method:'POST'});setMessage('Public website check completed.');onRefresh()}catch(e:any){setMessage(e.message||'Check failed')}finally{setBusy(false)}};
 const items=data.items||[];
 return <><section className="panel"><div className="panel-heading"><div><h3>Competitor watchlist</h3><p className="muted">Add public competitor domains. The dashboard checks publicly available page and technical SEO signals only.</p></div><Activity/></div><div className="inline-form"><input className="text-input" value={domain} onChange={e=>setDomain(e.target.value)} placeholder="example.com or https://example.com"/><button className="primary" onClick={add} disabled={busy||!domain.trim()}>{busy?'Saving…':'Add competitor'}</button></div>{message&&<p className="muted small">{message}</p>}{items.length?<div className="schedule-list">{items.map((item:any)=><div className="schedule-row" key={item._id}><div><b>{item.domain}</b><small>{item.lastCheckedAt?'Checked '+new Date(item.lastCheckedAt).toLocaleString():'Not checked yet'}{item.title?' · '+item.title:''}</small></div><div className="page-actions"><span className={'status-pill '+(item.status==='reachable'?'status-live':'status-pending')}>{item.status||'Tracking'}</span><button className="secondary" onClick={()=>check(item._id)} disabled={busy}>Check now</button></div></div>)}</div>:<div className="table-empty">No competitor domains added. Add up to five relevant competitors to start a watchlist.</div>}</section><section className="panel"><h3>How competitor monitoring works</h3><p className="muted">This free monitor checks public website availability, page titles and meta descriptions. It does not claim to know competitor Google rankings or backlinks without verified third-party data.</p></section></>;
}
function ReportsView({data}:{data:Payload}){
 const audit=data.audit||{};const gsc=data.gsc||{};const worker=data.automation?.worker||{};
 return <><div className="metric-grid"><Metric label="Technical SEO score" value={audit.score==null?'—':audit.score+'/100'} detail={audit.completedAt?'Latest technical crawl':'No completed audit'} icon={Gauge}/><Metric label="Organic clicks" value={gsc.connected?formatNumber(gsc.metrics?.clicks):'—'} detail={gsc.connected?'Google Search Console · 28 days':'Search Console not connected'} icon={Activity}/><Metric label="Impressions" value={gsc.connected?formatNumber(gsc.metrics?.impressions):'—'} detail="Verified Google data only" icon={Search}/><Metric label="Automation" value={worker.status||'unknown'} detail={worker.lastHeartbeat?'Last heartbeat '+new Date(worker.lastHeartbeat).toLocaleString():'No worker heartbeat'} icon={Zap}/></div><section className="panel"><div className="panel-heading"><div><h3>SEO action plan</h3><p className="muted">Prioritise technical fixes before creating more content</p></div><FileSearch/></div>{audit.issues?.length?<div className="schedule-list">{audit.issues.slice(0,15).map((issue:any,i:number)=><div className="schedule-row" key={i}><div><b>{String(issue.type||'SEO issue').replace(/_/g,' ')}</b><small>{issue.url||'Website-wide'} · {issue.severity||'review'}</small></div><span className="status-pill status-pending">Review</span></div>)}</div>:<div className="table-empty">Run a technical audit to create a data-backed SEO action plan.</div>}</section></>;
}

function formatNumber(value:any){return value==null?'—':Number(value).toLocaleString('en-IN',{maximumFractionDigits:2});}
