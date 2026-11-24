export type ServiceIcon = 'globe' | 'wordpress' | 'shopping' | 'mobile';

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface Service {
  slug: string;
  n: string;
  icon: ServiceIcon;
  title: string;
  short: string;
  /** SEO */
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  /** page copy */
  h1: string;
  intro: string;
  points: string[];
  features: { title: string; desc: string }[];
  tech: string[];
  faqs: ServiceFaq[];
}

export const SERVICES: Service[] = [
  {
    slug: 'custom-website-development',
    n: '01',
    icon: 'globe',
    title: 'Custom Website Development',
    short:
      'Fast, SEO-ready websites built from scratch with Next.js and React, designed around your brand and your customers.',
    metaTitle: 'Custom Website Development in Bhopal (Next.js & React)',
    metaDescription:
      'Custom website development company in Bhopal. Fast, SEO-ready Next.js and React websites for businesses, startups and professionals, with 6 months of support.',
    keywords: [
      'website development company in Bhopal',
      'custom website development Bhopal',
      'Next.js developer Bhopal',
      'React developer Bhopal',
      'business website design Bhopal',
    ],
    h1: 'Custom Website Development in Bhopal',
    intro:
      'We design and build custom websites with Next.js and React that load fast, look sharp on every device and are ready to rank on Google. No heavy templates, no bloat: just a clean, modern site built around your business.',
    points: [
      'Next.js and React websites',
      'Business and corporate websites',
      'Landing pages that convert',
      'Portfolio and company profile sites',
    ],
    features: [
      {
        title: 'Built for speed',
        desc: 'Server-rendered Next.js pages, optimised assets and clean code, so your site loads quickly even on slow mobile networks.',
      },
      {
        title: 'SEO-ready from day one',
        desc: 'Proper headings, meta tags, sitemap, structured data and mobile-first layouts so search engines can understand and rank your pages.',
      },
      {
        title: 'Fully responsive',
        desc: 'Designed for phones, tablets and desktops, because most of your visitors will arrive on a mobile screen.',
      },
      {
        title: 'Easy to grow',
        desc: 'A clean codebase and scalable structure, so adding pages, a blog, a booking form or a dashboard later is straightforward.',
      },
    ],
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js'],
    faqs: [
      {
        q: 'Why Next.js and React instead of a template?',
        a: 'Next.js gives faster load times and better SEO than most template-based sites, and a custom build means your design, features and branding are not limited by a theme.',
      },
      {
        q: 'How long does a custom website take?',
        a: 'A typical business website takes 2 to 4 weeks depending on the number of pages and features. We confirm the timeline in writing before we start.',
      },
      {
        q: 'Can I update the content myself?',
        a: 'Yes. We can connect a simple content system so you can edit text and images without touching code, or we can handle updates for you during the support period.',
      },
      {
        q: 'Do you provide support after launch?',
        a: 'Yes, every website includes 6 months of post-launch support covering bug fixes, updates and small changes.',
      },
    ],
  },
  {
    slug: 'wordpress-development',
    n: '02',
    icon: 'wordpress',
    title: 'WordPress Development',
    short:
      'Professional WordPress websites that are easy to manage, quick to launch and optimised for speed and search.',
    metaTitle: 'WordPress Development Company in Bhopal',
    metaDescription:
      'WordPress website development in Bhopal. Custom themes, business sites, blogs and WooCommerce stores that are fast, secure and easy to manage. 6 months support included.',
    keywords: [
      'WordPress developer in Bhopal',
      'WordPress website development Bhopal',
      'WordPress website design Bhopal',
      'WooCommerce development Bhopal',
      'WordPress company Bhopal',
    ],
    h1: 'WordPress Development in Bhopal',
    intro:
      'Need a website you can update yourself? We build clean, fast WordPress sites for businesses, schools, clinics, blogs and local services: designed properly, set up securely and handed over with simple training.',
    points: [
      'Custom WordPress websites',
      'Theme customisation and redesign',
      'Blogs and company sites',
      'WooCommerce online stores',
    ],
    features: [
      {
        title: 'Easy to manage',
        desc: 'Edit pages, add blog posts and update products yourself from a simple dashboard. We show you how it works.',
      },
      {
        title: 'Speed and security',
        desc: 'Lightweight setup, caching, image optimisation and sensible security practices instead of a slow site stuffed with plugins.',
      },
      {
        title: 'SEO foundations',
        desc: 'Clean structure, SEO-friendly URLs, meta settings, sitemap and mobile-first design built in from the start.',
      },
      {
        title: 'Redesign and fixes',
        desc: 'Already have a WordPress site that is slow, outdated or broken? We can redesign it, speed it up or fix issues.',
      },
    ],
    tech: ['WordPress', 'WooCommerce', 'PHP', 'MySQL', 'Elementor'],
    faqs: [
      {
        q: 'Is WordPress a good choice for my business?',
        a: 'If you want to manage content yourself, publish blogs regularly or need a site live quickly, WordPress is an excellent choice. For highly custom web apps, we may recommend Next.js instead.',
      },
      {
        q: 'Can you redesign my existing WordPress website?',
        a: 'Yes. We can refresh the design, improve speed and mobile layout, and fix problems without losing your existing content.',
      },
      {
        q: 'Do you build WooCommerce stores?',
        a: 'Yes. We can set up a WooCommerce store with products, payments and shipping. For larger catalogues we often suggest Shopify.',
      },
      {
        q: 'What happens after the website is delivered?',
        a: 'You get 6 months of support after launch for bug fixes, updates and small changes.',
      },
    ],
  },
  {
    slug: 'shopify-development',
    n: '03',
    icon: 'shopping',
    title: 'Shopify Development',
    short:
      'Shopify stores that look professional, load fast and make it easy for customers to browse, pay and come back.',
    metaTitle: 'Shopify Development Company in Bhopal',
    metaDescription:
      'Shopify developer in Bhopal. Custom Shopify stores, theme customisation, payment and shipping setup for Indian and international sellers. 6 months support included.',
    keywords: [
      'Shopify developer in Bhopal',
      'Shopify store development Bhopal',
      'Shopify website design India',
      'e-commerce website development Bhopal',
      'Shopify theme customisation',
    ],
    h1: 'Shopify Development in Bhopal',
    intro:
      'We set up and customise Shopify stores that are ready to sell: clean design, mobile-first layouts, product and collection structure, payments and shipping, so you can focus on running the business.',
    points: [
      'New Shopify store setup',
      'Theme customisation and redesign',
      'Payment gateway and shipping setup',
      'Speed and conversion improvements',
    ],
    features: [
      {
        title: 'Store set up properly',
        desc: 'Products, collections, navigation, taxes, payments and shipping configured correctly so you can start taking orders confidently.',
      },
      {
        title: 'Designed to convert',
        desc: 'Clear product pages, simple checkout flow and mobile-first design that makes it easy for customers to buy.',
      },
      {
        title: 'Fast and SEO-friendly',
        desc: 'Optimised images, clean theme code and SEO basics like titles, descriptions and structured product data.',
      },
      {
        title: 'Custom changes',
        desc: 'Need features beyond the theme? We can customise sections, add integrations and tailor the store to your brand.',
      },
    ],
    tech: ['Shopify', 'Liquid', 'JavaScript', 'Shopify apps & integrations'],
    faqs: [
      {
        q: 'Can you build a Shopify store for selling in India?',
        a: 'Yes. We can configure INR pricing, Indian payment gateways, shipping and GST-related settings as needed for your business.',
      },
      {
        q: 'Can you redesign my existing Shopify store?',
        a: 'Yes. We can improve design, product pages and speed on your existing store without disturbing your products or orders.',
      },
      {
        q: 'Do I need to buy a theme?',
        a: 'Not always. We can customise a free or paid Shopify theme to match your brand. We will recommend the most cost-effective option for your store.',
      },
      {
        q: 'Is support included after launch?',
        a: 'Yes, you get 6 months of post-launch support for fixes, small changes and questions.',
      },
    ],
  },
  {
    slug: 'app-development',
    n: '04',
    icon: 'mobile',
    title: 'Mobile App Development (React Native & Expo)',
    short:
      'Android and iOS apps built from one codebase with React Native and Expo: faster to build and simpler to maintain.',
    metaTitle: 'Mobile App Development in Bhopal (React Native & Expo)',
    metaDescription:
      'React Native and Expo app development in Bhopal. Android and iOS apps from a single codebase for startups and businesses, with 6 months of post-launch support.',
    keywords: [
      'app development company in Bhopal',
      'React Native developer Bhopal',
      'Expo app development',
      'mobile app development Bhopal',
      'Android and iOS app development India',
    ],
    h1: 'Mobile App Development in Bhopal',
    intro:
      'We build cross-platform mobile apps with React Native and Expo, so one codebase gives you both an Android and an iOS app. It is a practical way to launch faster, control cost and keep the app easy to maintain.',
    points: [
      'Android and iOS apps from one codebase',
      'React Native with Expo',
      'Backend and API integration',
      'App store publishing support',
    ],
    features: [
      {
        title: 'One codebase, two platforms',
        desc: 'React Native and Expo let us ship Android and iOS together, which saves time and budget compared with building two native apps.',
      },
      {
        title: 'Connected to your backend',
        desc: 'Login, databases, payments, notifications and APIs built with Node.js and cloud services, so the app works with real data.',
      },
      {
        title: 'Clean, usable design',
        desc: 'Simple navigation and clear screens designed around how your customers will actually use the app.',
      },
      {
        title: 'Launch support',
        desc: 'Help with preparing your build and publishing to Google Play and the Apple App Store.',
      },
    ],
    tech: ['React Native', 'Expo', 'TypeScript', 'Node.js', 'MongoDB'],
    faqs: [
      {
        q: 'Why React Native with Expo?',
        a: 'It lets us build Android and iOS apps together from one codebase, speeds up development and makes updates easier, while still delivering a smooth native-feeling experience.',
      },
      {
        q: 'How long does it take to build an app?',
        a: 'A focused first version usually takes 6 to 12 weeks, depending on features. We define the scope and timeline in the proposal before starting.',
      },
      {
        q: 'Can you also build the backend for my app?',
        a: 'Yes. We build the APIs and database with Node.js so your app and any web dashboard work together.',
      },
      {
        q: 'Will you help publish the app?',
        a: 'Yes. We help prepare the build and guide you through publishing on Google Play and the Apple App Store. Store accounts and fees are paid by the client.',
      },
      {
        q: 'Is support included after launch?',
        a: 'Yes, every app includes 6 months of post-launch support for bug fixes and small improvements.',
      },
    ],
  },
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
