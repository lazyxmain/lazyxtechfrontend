/** @type {import('next').NextConfig} */
const api=(process.env.NEXT_PUBLIC_API_URL||'http://localhost:4000').replace(/\/$/,'');
module.exports={
 reactStrictMode:true,poweredByHeader:false,compress:true,
 experimental:{optimizePackageImports:['lucide-react']},
 async rewrites(){return [
  {source:'/api/:path*',destination:api+'/api/:path*'},
  {source:'/auth/:path*',destination:api+'/api/auth/:path*'}
 ]}
};
