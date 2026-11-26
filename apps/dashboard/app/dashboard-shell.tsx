'use client';
import Link from 'next/link';
import {usePathname,useRouter} from 'next/navigation';
import {BarChart3,Search,ShieldCheck,FileText,Settings,Bot,Users,Bell,Gauge,Sun,Moon,LogOut,Menu,X,Globe,Activity,Zap} from 'lucide-react';
import {useState,useEffect} from 'react';
const API=process.env.NEXT_PUBLIC_API_URL||'http://localhost:4000';
const nav=[['Overview','/'],['SEO Analytics','/seo'],['Keywords','/keywords'],['Technical Audit','/audit'],['Page Speed','/speed'],['Competitors','/competitors'],['AI Content','/content'],['Blog Manager','/blog'],['Leads','/leads'],['Notifications','/notifications'],['AI Agents','/agents'],['Automation','/automation'],['Reports','/reports'],['Settings','/settings']];
const icons=[BarChart3,Search,Search,ShieldCheck,Gauge,Users,FileText,FileText,Users,Bell,Bot,Zap,BarChart3,Settings];
export default function DashboardShell({children}:{children:React.ReactNode}){
 const path=usePathname(); const router=useRouter(); const [dark,setDark]=useState(false); const [open,setOpen]=useState(false);
 useEffect(()=>{const d=localStorage.getItem('lx-theme')==='dark';setDark(d);document.documentElement.classList.toggle('dark',d)},[]);
 const toggle=()=>{const d=!dark;setDark(d);localStorage.setItem('lx-theme',d?'dark':'light');document.documentElement.classList.toggle('dark',d)};
 const logout=async()=>{await fetch(API+'/api/auth/logout',{method:'POST',credentials:'include'});router.replace('/login')};
 return <div className="app-shell"><aside className={open?'sidebar mobile-open':'sidebar'}><div className="brand">LazyX<span>Tech</span><button className="mobile-close" onClick={()=>setOpen(false)}><X size={18}/></button></div><nav>{nav.map(([label,url],i)=>{const I=icons[i];return <Link onClick={()=>setOpen(false)} className={path===url?'active':''} href={url} key={url}><I size={17}/>{label}</Link>})}</nav><div className="side-bottom"><div className="secure"><ShieldCheck size={15}/> Owner access only</div><button onClick={logout} className="logout"><LogOut size={15}/> Sign out</button></div></aside><main className="content"><header className="topbar"><button className="menu-btn" onClick={()=>setOpen(true)}><Menu/></button><div><div className="eyebrow">LAZYXTECH / PRIVATE</div><h1>SEO Command Center</h1></div><div className="top-actions"><Link href="/settings" className="icon-btn"><Settings size={18}/></Link><button className="icon-btn" onClick={toggle} aria-label="Toggle theme">{dark?<Sun size={18}/>:<Moon size={18}/>}</button></div></header>{children}</main></div>
}
