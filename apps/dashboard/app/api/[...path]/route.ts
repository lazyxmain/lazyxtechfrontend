const API=(process.env.NEXT_PUBLIC_API_URL||'https://lazyxtech-api.onrender.com').replace(/\/$/,'');
export const dynamic='force-dynamic';
export const runtime='nodejs';

async function proxy(request:Request,context:{params:Promise<{path:string[]}>}){
 const {path}=await context.params;
 const target=API+'/api/'+path.map(encodeURIComponent).join('/')+new URL(request.url).search;
 const headers=new Headers();
 for(const key of ['accept','content-type','cookie','authorization']){const value=request.headers.get(key);if(value)headers.set(key,value);}
 let upstream:Response|undefined;
 const bodyBuffer=['GET','HEAD'].includes(request.method)?undefined:await request.arrayBuffer();
 for(let attempt=0;attempt<2;attempt++){
  try{
   upstream=await fetch(target,{method:request.method,headers,body:bodyBuffer,cache:'no-store',redirect:'manual',signal:AbortSignal.timeout(25000)});
   if(upstream.status!==502&&upstream.status!==503&&upstream.status!==504) break;
  }catch{}
  if(attempt<1) await new Promise(resolve=>setTimeout(resolve,1200));
 }
 if(!upstream)return Response.json({error:'Backend is temporarily unavailable. Your sign-in session has not been cleared. Please retry in a moment.'},{status:502,headers:{'Cache-Control':'no-store'}});
 const responseHeaders=new Headers();
 for(const key of ['content-type','cache-control','location','www-authenticate']){const value=upstream.headers.get(key);if(value)responseHeaders.set(key,value);}
 const cookies=(upstream.headers as any).getSetCookie?.()||[];
 if(cookies.length)for(const cookie of cookies)responseHeaders.append('set-cookie',cookie);
 else {const cookie=upstream.headers.get('set-cookie');if(cookie)responseHeaders.append('set-cookie',cookie);}
 responseHeaders.set('Cache-Control','no-store');
 const body=['GET','HEAD'].includes(request.method)?await upstream.arrayBuffer():await upstream.arrayBuffer();
 return new Response(body,{status:upstream.status,headers:responseHeaders});
}
export const GET=proxy;
export const POST=proxy;
export const PUT=proxy;
export const PATCH=proxy;
export const DELETE=proxy;
