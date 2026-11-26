const API=(process.env.NEXT_PUBLIC_API_URL||'https://lazyxtech-api.onrender.com').replace(/\/$/,'');
export const dynamic='force-dynamic';
export const runtime='nodejs';
export async function GET(request:Request){
 try{
  const query=new URL(request.url).search;
  const upstream=await fetch(API+'/api/auth/google/callback'+query,{cache:'no-store',redirect:'manual'});
  const headers=new Headers({'Cache-Control':'no-store'});
  const cookies=(upstream.headers as any).getSetCookie?.()||[];
  if(cookies.length)for(const value of cookies)headers.append('set-cookie',value);
  else {const value=upstream.headers.get('set-cookie');if(value)headers.append('set-cookie',value);}
  const location=upstream.headers.get('location');
  if(location){
   const target=new URL(location);
   const dashboardOrigin=new URL(request.url).origin;
   return new Response(null,{status:302,headers:{...Object.fromEntries(headers.entries()),Location:target.pathname==='/'?dashboardOrigin+'/':dashboardOrigin+target.pathname+target.search}});
  }
  const body=await upstream.arrayBuffer();
  headers.set('Content-Type',upstream.headers.get('content-type')||'text/plain; charset=utf-8');
  return new Response(body,{status:upstream.status,headers});
 }catch{
  return Response.redirect(new URL('/login?error=google',request.url),302);
 }
}
