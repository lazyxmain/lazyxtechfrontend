import './globals.css';
import type { Metadata } from 'next';
export const metadata:Metadata={title:{default:'LazyXTech Command Center',template:'%s | LazyXTech'},description:'Internal SEO automation and monitoring command center.'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en" suppressHydrationWarning><body>{children}</body></html>}
