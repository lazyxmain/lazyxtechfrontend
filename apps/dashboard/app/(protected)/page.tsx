'use client';
import {useEffect,useState} from 'react';
import {Activity,AlertCircle,ArrowUpRight,CheckCircle2,Clock3,FileSearch,Gauge,RefreshCw,Search,ShieldCheck,Zap} from 'lucide-react';
const API='/api';
const fmt=(v:any)=>v==null?'—':Number(v).toLocaleString('en-IN',{maximumFractionDigits:2});
export default function Home(){
 const [gsc,setGsc]=useState<any>(null);const [audit,setAudit]=useState<any>(null);const [automation,setAutomation]=useState<any>(null);const [loading,setLoading]=useState(true);
 const load=()=>{setLoading(true);Promise.all([
 fetch(API+'/search-console/summary?days=28',{credentials:'include'}).then(r=>r.json()),
 fetch(API+'/audits/latest',{credentials:'include'}).then(r=>r.ok?r.json():null),
 fetch(API+'/automation/status',{credentials:'include'}).then(r=>r.ok?r.json():null)
 ]).then(([s,a,j])=>{setGsc(s);setAudit(a);setAutomation(j)}).finally(()=>setLoading(false))};
 useEffect(()=>{load()},[]);
 const schedules=automation?.schedules||[];
 return <div className="page">
 <div className="page-head"><div><p className="eyebrow">OVERVIEW</p><h2>Welcome to your command center</h2><p className="muted">A clear view of website health, organic search and background monitoring.</p></div><button className="icon-btn" onClick={load} aria-label="Refresh dashboard"><RefreshCw size={16}/></button></div>
 <div className="metric-grid">
 <Metric label="Technical SEO score" value={audit?.score==null?'—':audit.score+'/100'} detail={audit?.completedAt?'Latest recorded audit':'Run your first audit'} icon={Gauge}/>
 <Metric label="Organic clicks" value={gsc?.connected?fmt(gsc.metrics?.clicks):'—'} detail={gsc?.connected?'Google Search Console · 28 days':'Connect Search Console'} icon={Activity}/>
 <Metric label="Impressions" value={gsc?.connected?fmt(gsc.metrics?.impressions):'—'} detail={gsc?.connected?'Google Search Console · 28 days':'Verified data only'} icon={Search}/>
 <Metric label="Worker status" value={automation?.worker?.status==='online'?'Online':'Unknown'} detail={automation?.worker?.lastHeartbeat?'Heartbeat received':'Waiting for worker heartbeat'} icon={Zap}/>
 </div>
 <div className="two-col">
 <section className="panel"><div className="panel-heading"><div><h3>Google Search Console</h3><p className="muted">Organic search performance</p></div><Search/></div>
 {gsc?.connected?<div className="overview-stats"><div><small>Click-through rate</small><b>{(gsc.metrics.ctr*100).toFixed(2)}%</b></div><div><small>Average position</small><b>{Number(gsc.metrics.position).toFixed(1)}</b></div></div>:<div className="empty"><AlertCircle/><strong>Search Console is not connected</strong><span>Open Settings to configure the Google service account and verified property.</span></div>}
 </section>
 <section className="panel"><div className="panel-heading"><div><h3>Monitoring health</h3><p className="muted">Background worker and scheduled jobs</p></div><ShieldCheck/></div>
 <div className="health"><div><ShieldCheck/><span>Worker heartbeat</span><b>{automation?.worker?.status==='online'?'Online':'Unknown'}</b></div>{schedules.slice(0,3).map((job:any)=><div key={job.key}><Clock3/><span>{job.label||job.key}</span><b>{job.lastStatus||'Waiting'}</b></div>)}</div>
 </section>
 </div>
 <section className="panel overview-audit"><div className="panel-heading"><div><h3>Latest technical audit</h3><p className="muted">Deterministic checks, not generated placeholder scores</p></div><FileSearch/></div>
 {audit?<div className="overview-stats"><div><small>SEO score</small><b>{audit.score}/100</b></div><div><small>Issues detected</small><b>{audit.issues?.length||0}</b></div><div><small>Last completed</small><b>{new Date(audit.completedAt||audit.createdAt).toLocaleString()}</b></div></div>:<div className="table-empty">{loading?'Loading monitoring data…':'No audit has been recorded yet. Open Technical Audit and run your first crawl.'}</div>}
 </section>
 </div>;
}
function Metric({label,value,detail,icon:Icon}:{label:string,value:string,detail:string,icon:any}){return <div className="metric-card"><div className="metric-top"><span>{label}</span><Icon size={17}/></div><strong>{value}</strong><small>{detail}</small></div>}
