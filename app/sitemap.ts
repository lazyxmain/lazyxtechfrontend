import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { SERVICES } from '@/lib/services';

const api=(process.env.NEXT_PUBLIC_API_URL||'https://lazyxtech-api.onrender.com').replace(/\\/$/,'');
async function publishedBlogUrls(){try{const r=await fetch(api+'/api/public/blogs',{next:{revalidate:3600},signal:AbortSignal.timeout(7000)});if(!r.ok)return [];const blogs=await r.json();return Array.isArray(blogs)?blogs.map((b:any)=>({url:`${SITE_URL}/blog/${b.slug}`,lastModified:new Date(b.publishedAt||b.createdAt||Date.now()),changeFrequency:'monthly' as const,priority:0.7})):[]}catch{return []}}
export default async function sitemap():Promise<MetadataRoute.Sitemap>{
 const now=new Date();
 const articles=await publishedBlogUrls();
 return [
  {url:SITE_URL,lastModified:now,changeFrequency:'weekly',priority:1},
  {url:`${SITE_URL}/blog`,lastModified:now,changeFrequency:'daily',priority:0.8},
  ...SERVICES.map(s=>({url:`${SITE_URL}/services/${s.slug}`,lastModified:now,changeFrequency:'monthly' as const,priority:0.9})),
  ...articles,
 ];
}
