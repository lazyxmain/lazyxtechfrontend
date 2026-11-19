import './globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { SmoothScrollProvider } from '@/components/smooth-scroll-provider';
import { Cursor } from '@/components/cursor';
import { PageLoader } from '@/components/page-loader';

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const display = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'LazyXTech — Global Digital Product & Software Development Agency',
  description:
    'Your Ideas. Our Technology. Built for What\'s Next. LazyXTech builds high-performance websites, custom web applications, e-commerce platforms, and scalable software for ambitious businesses worldwide.',
  keywords: [
    'software development agency',
    'web development',
    'Next.js development',
    'custom web applications',
    'e-commerce development',
    'SaaS development',
    'Node.js API development',
  ],
  openGraph: {
    title: 'LazyXTech — Global Digital Product & Software Development Agency',
    description:
      'We build digital products that move businesses forward. Websites, web apps, e-commerce, and scalable software.',
    type: 'website',
    siteName: 'LazyXTech',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LazyXTech — Global Digital Product & Software Development Agency',
    description:
      'We build digital products that move businesses forward.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${display.variable}`}>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SmoothScrollProvider>
            <Cursor />
            <PageLoader />
            <div className="grain" aria-hidden="true" />
            {children}
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
