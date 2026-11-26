'use client';
import {useCallback,useEffect,useState} from 'react';
import {useRouter} from 'next/navigation';
export default function AuthGuard({children}:{children:React.ReactNode}){
 const router=useRouter();const [ready,setReady]=useState(false);const [checking,setChecking]=useState(false);const [problem,setProblem]=useState('');
 const verify=useCallback(async()=>{
  setChecking(true);setProblem('');
  try{const response=await fetch('/api/me',{credentials:'include',cache:'no-store'});
   if(response.status===401){router.replace('/login');return;}
   if(!response.ok){setProblem('The server could not verify your session right now. Your login has not been cleared.');return;}
   setReady(true);
  }catch{setProblem('Could not reach the sign-in server. Check your connection and retry.');}
  finally{setChecking(false);}
 },[router]);
 useEffect(()=>{void verify()},[verify]);
 if(!ready)return <div className="loading-screen">{problem?<div role="alert"><p>{problem}</p><button className="secondary" onClick={()=>void verify()} disabled={checking}>{checking?'Checking…':'Retry session check'}</button></div>:'Checking secure session…'}</div>;
 return <>{children}</>;
}
