/** @type {import('next').NextConfig} */
module.exports={
  reactStrictMode:true,
  poweredByHeader:false,
  compress:true,
  experimental:{optimizePackageImports:['lucide-react']},
  async rewrites(){return [{source:'/api/:path*',destination:(process.env.NEXT_PUBLIC_API_URL||'http://localhost:4000')+'/api/:path*'}]}
};
