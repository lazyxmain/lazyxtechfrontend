'use client';
import {useEffect,useState,FormEvent} from 'react';
import {useRouter} from 'next/navigation';
import {ShieldCheck,LockKeyhole,Mail} from 'lucide-react';

const API='/api';
export default function Login(){
 const router=useRouter(); const [loading,setLoading]=useState(false); const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [error,setError]=useState('');
 useEffect(()=>{let active=true;fetch(API+'/me',{credentials:'include',cache:'no-store'}).then(r=>{if(active&&r.ok)router.replace('/')}).catch(()=>{});return()=>{active=false}},[router]);
 const submit=async(e:FormEvent)=>{e.preventDefault();setLoading(true);setError('');try{const r=await fetch(API+'/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},credentials:'include',body:JSON.stringify({email,password})});const j=await r.json().catch(()=>({}));if(!r.ok)throw new Error(j.error||'Login failed');const session=await fetch(API+'/me',{credentials:'include',cache:'no-store'});if(!session.ok)throw new Error(session.status===401?'Login was accepted but the session cookie was not received. Please retry; if this repeats, the server cookie configuration needs attention.':'Login succeeded, but the session check is temporarily unavailable. Please retry.');router.replace('/');router.refresh()}catch(e:any){setError(e.message||'Unable to sign in')}finally{setLoading(false)}};
 return <main className="login-wrap"><section className="login-card">
  <div className="brand">LazyX<span>Tech</span></div><div className="login-icon"><ShieldCheck/></div>
  <h1>Welcome back</h1><p className="muted">Sign in to your private LazyXTech command center.</p>
  <form onSubmit={submit} className="login-form">
   <label className="login-label">Email address</label><div className="login-input-wrap"><Mail size={17}/><input type="email" autoComplete="username" placeholder="Owner email" value={email} onChange={e=>setEmail(e.target.value)} required/></div>
   <label className="login-label">Password</label><div className="login-input-wrap"><LockKeyhole size={17}/><input type="password" autoComplete="current-password" placeholder="Enter your password" value={password} onChange={e=>setPassword(e.target.value)} required/></div>
   <button className="google-btn login-submit" type="submit" disabled={loading}>{loading?'Signing in…':'Sign in with email & password'}</button>
  </form>
  <div className="login-note">Owner-only access · Authorized email: <strong>lazyxcustomer@gmail.com</strong></div>
  {error&&<div className="error" role="alert">{error}</div>}
 </section></main>
}
