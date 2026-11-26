'use client';
import {useEffect,useState,FormEvent} from 'react';
import {useRouter} from 'next/navigation';
import {ShieldCheck,Chrome,LockKeyhole,Mail} from 'lucide-react';

const API='/api';
export default function Login(){
 const router=useRouter(); const [loading,setLoading]=useState(false); const [googleLoading,setGoogleLoading]=useState(false); const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [error,setError]=useState('');
 useEffect(()=>{fetch(API+'/me',{credentials:'include'}).then(r=>{if(r.ok)router.replace('/')}).catch(()=>{})},[router]);
 const submit=async(e:FormEvent)=>{e.preventDefault();setLoading(true);setError('');try{const r=await fetch(API+'/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},credentials:'include',body:JSON.stringify({email,password})});const j=await r.json().catch(()=>({}));if(!r.ok)throw new Error(j.error||'Login failed');router.replace('/');router.refresh()}catch(e:any){setError(e.message||'Unable to sign in')}finally{setLoading(false)}};
 const google=()=>{setGoogleLoading(true);window.location.href=API+'/auth/google/start'};
 return <main className="login-wrap"><section className="login-card">
  <div className="brand">LazyX<span>Tech</span></div><div className="login-icon"><ShieldCheck/></div>
  <h1>Welcome back</h1><p className="muted">Sign in to your private LazyXTech command center.</p>
  <form onSubmit={submit} className="login-form">
   <label className="login-label">Email address</label><div className="login-input-wrap"><Mail size={17}/><input type="email" autoComplete="username" placeholder="Owner email" value={email} onChange={e=>setEmail(e.target.value)} required/></div>
   <label className="login-label">Password</label><div className="login-input-wrap"><LockKeyhole size={17}/><input type="password" autoComplete="current-password" placeholder="Enter your password" value={password} onChange={e=>setPassword(e.target.value)} required/></div>
   <button className="google-btn login-submit" type="submit" disabled={loading}>{loading?'Signing in…':'Sign in with email & password'}</button>
  </form>
  <div className="login-divider"><span>OR</span></div>
  <button className="google-btn" onClick={google} disabled={googleLoading}><Chrome size={18}/>{googleLoading?'Opening Google…':'Continue with Google'}</button>
  <div className="login-note">Owner-only access · Authorized email: <strong>lazyxcustomer@gmail.com</strong></div>
  {error&&<div className="error" role="alert">{error}</div>}
 </section></main>
}
