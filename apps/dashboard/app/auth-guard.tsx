'use client';
import {useCallback,useEffect,useState} from 'react';
import {useRouter} from 'next/navigation';
export default function AuthGuard({children}:{children:React.ReactNode}){
 const router=useRouter();const [ready,setReady]=useState(false);const [checking,setChecking]=useState(false);const [problem,setProblem]=useState('');
 const verify=useCallback(async()=>{
  setChecking(true);setProblem('');
  let lastStatus=0;
  for(let attempt=0;attempt<3;attempt++){
   try{
    const response=await fetch('/api/me',{credentials:'include',cache:'no-store'});
    lastStatus=response.status;
    if(response.status===401){router.replace('/login');return;}
    if(response.ok){setReady(true);setChecking(false);return;}
   }catch{}
   if(attempt<2) await new Promise(resolve=>setTimeout(resolve,1200*(attempt+1)));
  }
  setProblem(lastStatus===502||lastStatus===503?'The backend is waking up or restarting. Your login has not been cleared. Retry in a few seconds.':'The server could not verify your session right now. Your login has not been cleared.');
  setChecking(false);
 },[router]);
 useEffect(()=>{void verify()},[verify]);
 if(!ready)return <div className="loading-screen">{problem?<div role="alert"><p>{problem}</p><button className="secondary" onClick={()=>void verify()} disabled={checking}>{checking?'Checking…':'Retry session check'}</button></div>:'Checking secure session…'}</div>;
 return <>{children}</>;
}
