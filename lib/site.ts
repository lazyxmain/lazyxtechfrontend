/**
 * Single source of truth for SEO. Set NEXT_PUBLIC_SITE_URL in Netlify to the
 * real production domain (e.g. https://lazyxtech.com). On Netlify the build
 * also exposes URL, which is used as a fallback.
 */
const raw =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.URL ||
  'https://lazyxtech.com';

export const SITE_URL = raw.replace(/\/+$/, '');
export const SITE_NAME = 'LazyXTech';
export const SITE_TITLE =
  'LazyXTech | Web Development, Next.js & Custom Software Agency';
export const SITE_DESCRIPTION =
  'LazyXTech is a global digital product agency building fast Next.js websites, custom web applications, e-commerce stores and scalable backend APIs for ambitious businesses in the USA, UK, Canada, Australia, Europe and India.';

export const FAQS = [
  {
    q: 'What services does LazyXTech offer?',
    a: 'We build high-performance business websites, custom web applications (SaaS, CRM, ERP, dashboards), e-commerce stores on Shopify or custom platforms, and backend and API systems with Node.js and Fastify.',
  },
  {
    q: 'Which technologies do you use?',
    a: 'Our core stack is React, Next.js, TypeScript, Tailwind CSS, Node.js, Fastify, MongoDB, MySQL, Redis and Shopify. We choose tools based on what each project needs, not on trends.',
  },
  {
    q: 'How long does a website or web app project take?',
    a: 'A business website or landing page usually takes 2 to 4 weeks. Custom web applications and e-commerce platforms typically take 6 to 16 weeks depending on scope. We share a clear roadmap after the discovery phase.',
  },
  {
    q: 'Do you work with international clients?',
    a: 'Yes. We work with businesses and founders across the USA, UK, Canada, Australia, Europe and India, with transparent communication and overlapping working hours.',
  },
  {
    q: 'Will my website be fast and SEO friendly?',
    a: 'Performance and SEO are built in from day one: Next.js server rendering, optimized assets, semantic markup, structured data, sitemap and Core Web Vitals focused development.',
  },
  {
    q: 'Do you provide support after launch?',
    a: 'Yes. We offer ongoing maintenance, performance monitoring and feature iterations so your product keeps improving after it goes live.',
  },
];
