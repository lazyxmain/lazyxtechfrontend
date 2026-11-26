const API=(process.env.NEXT_PUBLIC_API_URL||'https://lazyxtech-api.onrender.com').replace(/\/$/,'');
export const dynamic='force-dynamic';
export const runtime='nodejs';
export async function GET(){
 try{
  const upstream=await fetch(API+'/api/auth/google/start',{cache:'no-store',redirect:'manual'});
  const location=upstream.headers.get('location');
  if(location)return Response.redirect(location,302);
  return Response.json({error:'Google sign-in could not be started.'},{status:upstream.status||502});
 }catch{
  return Response.json({error:'Authentication server is temporarily unavailable.'},{status:502});
 }
}
