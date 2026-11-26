'use client';
import {useEffect,useState} from 'react';
import {useRouter} from 'next/navigation';
import {ShieldCheck,Chrome} from 'lucide-react';

const API=process.env.NEXT_PUBLIC_API_URL||'http://localhost:4000';
export default function Login(){
 const router=useRouter(); const [loading,setLoading]=useState(false); const [error,setError]=useState('');
 useEffect(()=>{fetch(API+'/api/me',{credentials:'include'}).then(r=>{if(r.ok)router.replace('/')}).catch(()=>{})},[router]);
 const google=()=>{setLoading(true);window.location.href=API+'/api/auth/google/start'};
 return <main className="login-wrap"><section className="login-card">
  <div className="brand">LazyX<span>Tech</span></div><div className="login-icon"><ShieldCheck/></div>
  <h1>Command Center</h1><p className="muted">Private owner dashboard. Only the authorized LazyXTech account can continue.</p>
  <button className="google-btn" onClick={google} disabled={loading}><Chrome size={18}/>{loading?'Opening Google…':'Continue with Google'}</button>
  <div className="login-note">Authorized account: <strong>lazyxcustomer@gmail.com</strong></div>
  {error&&<div className="error">{error}</div>}
 </section></main>
}
