import { NextResponse } from 'next/server';

const API=(process.env.NEXT_PUBLIC_API_URL||'https://lazyxtech-api.onrender.com').replace(/\/$/,'');
export async function POST(request:Request){
  try{
    const body=await request.json();
    const response=await fetch(API+'/api/leads',{
      method:'POST',
      headers:{'Content-Type':'application/json','Accept':'application/json'},
      body:JSON.stringify(body),
      cache:'no-store',
      signal:AbortSignal.timeout(15000)
    });
    const payload=await response.json().catch(()=>({}));
    if(!response.ok)return NextResponse.json({error:payload.error||'Unable to send your inquiry right now.'},{status:response.status});
    return NextResponse.json({ok:true});
  }catch{
    return NextResponse.json({error:'Our enquiry service is temporarily unavailable. Please use the email or WhatsApp option instead.'},{status:503});
  }
}
