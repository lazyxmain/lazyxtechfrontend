'use client';
import {useEffect,useState} from 'react';
import {useRouter} from 'next/navigation';
const API=process.env.NEXT_PUBLIC_API_URL||'http://localhost:4000';
export default function AuthGuard({children}:{children:React.ReactNode}){
 const router=useRouter(); const [ready,setReady]=useState(false);
 useEffect(()=>{fetch(API+'/api/me',{credentials:'include'}).then(r=>{if(!r.ok)router.replace('/login');else setReady(true)}).catch(()=>router.replace('/login'))},[router]);
 if(!ready)return <div className="loading-screen">Checking secure session…</div>;
 return <>{children}</>;
}
