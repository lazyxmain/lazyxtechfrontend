'use client';
import {useEffect,useState} from 'react';
import {Activity,CheckCircle2,Clock3,Gauge,Search,ShieldCheck} from 'lucide-react';
const API=process.env.NEXT_PUBLIC_API_URL||'http://localhost:4000';
export default function Home(){const [d,setD]=useState<any>(null);const [audit,setAudit]=useState<any>(null);
 useEffect(()=>{Promise.all([fetch(API+'/api/overview',{credentials:'include'}).then(r=>r.json()),fetch(API+'/api/audits/latest',{credentials:'include'}).then(r=>r.ok?r.json():null)]).then(([a,b])=>{setD(a);setAudit(b)})},[]);
 return <div className="page"><div className="page-head"><div><p className="eyebrow">OVERVIEW</p><h2>Good morning, LazyXTech 👋</h2><p className="muted">Your private SEO, analytics and automation control center.</p></div></div>
 <div className="stat-grid"><Stat label="SEO score" value={audit?.score!=null?audit.score+'/100':'—'} icon={<Gauge/>}/><Stat label="Organic clicks" value="—" icon={<Activity/>}/><Stat label="Impressions" value="—" icon={<Search/>}/><Stat label="System" value="Online" icon={<CheckCircle2/>}/></div>
 <div className="two-col"><section className="panel"><h3>Performance</h3><div className="empty"><Activity/><strong>Connect Google Search Console</strong><span>Once connected, verified clicks, impressions, CTR and position will appear here.</span></div></section><section className="panel"><h3>Automation health</h3><div className="health"><div><ShieldCheck/><span>Technical SEO</span><b>Scheduled</b></div><div><Clock3/><span>Reports</span><b>Scheduled</b></div><div><Gauge/><span>PageSpeed</span><b>On demand</b></div></div></section></div></div>}
function Stat({label,value,icon}:{label:string,value:string,icon:React.ReactNode}){return <div className="stat"><div className="stat-icon">{icon}</div><div><div className="muted">{label}</div><strong>{value}</strong></div></div>}
