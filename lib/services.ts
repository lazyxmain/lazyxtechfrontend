export type ServiceIcon =
  | 'globe'
  | 'wordpress'
  | 'shopping'
  | 'mobile'
  | 'search'
  | 'layers';

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
  /** shown as a card on the home page */
  card?: boolean;
  /** related deep-dive pages (slugs) */
  related?: string[];
  /** replaces the default "6 months support" callout */
  callout?: { title: string; text: string };
}

export const SERVICES: Service[] = [
  {
    slug: 'custom-website-development',
    card: true,
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
    n: '',
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
    n: '',
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
    n: '05',
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
  {
    slug: 'platform-development',
    card: true,
    n: '02',
    icon: 'layers',
    title: 'WordPress, Shopify & Platform Development',
    short:
      'Get online fast on the right platform: WordPress, Shopify, Wix, Framer, Lovable and more, set up properly and easy for you to manage.',
    metaTitle: 'WordPress, Shopify, Wix & Framer Development in Bhopal',
    metaDescription:
      'Website development on WordPress, Shopify, Wix, Framer, Lovable and other platforms in Bhopal. We pick the right platform, build it properly and support it for 6 months.',
    keywords: [
      'WordPress developer Bhopal',
      'Shopify developer Bhopal',
      'Wix website developer India',
      'Framer website developer',
      'Lovable website development',
      'no-code website development',
    ],
    h1: 'WordPress, Shopify, Wix, Framer & Platform Development in Bhopal',
    intro:
      'Not every business needs a fully custom build. We help you launch quickly on the platform that fits your goals and budget: WordPress for content sites, Shopify for online stores, Framer and Wix for design-led marketing sites, and Lovable and other modern builders for fast MVPs. Then we set it up properly, not just install a theme.',
    points: [
      'WordPress and WooCommerce websites',
      'Shopify store setup and customisation',
      'Wix and Framer websites',
      'Lovable and other no-code / AI builder projects',
    ],
    features: [
      {
        title: 'The right platform for the job',
        desc: 'We recommend a platform based on your goals, budget and how you want to manage the site, rather than pushing one tool for everything.',
      },
      {
        title: 'Set up properly',
        desc: 'Clean structure, speed optimisation, mobile layouts, SEO basics, analytics and security, so the site works well and not just looks good.',
      },
      {
        title: 'Easy for you to manage',
        desc: 'Update pages, products and content yourself. We hand over with simple guidance and stay available for 6 months after launch.',
      },
      {
        title: 'Redesign, migrate or rescue',
        desc: 'Already on a platform and unhappy? We can redesign it, move you to a better one, or clean up and productionise something built quickly with a tool like Lovable.',
      },
    ],
    tech: ['WordPress', 'WooCommerce', 'Shopify', 'Wix', 'Framer', 'Lovable'],
    related: ['wordpress-development', 'shopify-development'],
    faqs: [
      {
        q: 'Which platform should I choose: WordPress, Shopify, Wix or Framer?',
        a: 'WordPress suits content-heavy sites and blogs, Shopify is best for online stores, Framer is great for polished marketing sites, and Wix works for simple small-business sites. Tell us your goals and we will recommend the best fit.',
      },
      {
        q: 'Can you work with Lovable or other AI site builders?',
        a: 'Yes. If you have started a project in a tool like Lovable, we can review it, fix issues, improve design and performance, connect your domain and make it production-ready.',
      },
      {
        q: 'Can you move my website from one platform to another?',
        a: 'Yes. We can migrate content and design to a better-suited platform while keeping your pages and SEO as intact as possible.',
      },
      {
        q: 'Is support included after launch?',
        a: 'Yes, every development project includes 6 months of post-launch support.',
      },
    ],
  },
  {
    slug: 'seo-optimization',
    card: true,
    n: '03',
    icon: 'search',
    title: 'SEO Optimization & Web Ranking',
    short:
      'Get found on Google. SEO audits, technical fixes and on-page optimisation that help the right customers discover your business.',
    metaTitle: 'SEO Services & Website Ranking in Bhopal',
    metaDescription:
      'SEO company in Bhopal offering SEO audits, technical SEO, on-page optimisation, local SEO and ranking improvement to help your website get found on Google.',
    keywords: [
      'SEO services in Bhopal',
      'SEO company Bhopal',
      'website ranking Bhopal',
      'SEO audit India',
      'local SEO Bhopal',
      'technical SEO services',
    ],
    h1: 'SEO Optimization & Web Ranking in Bhopal',
    intro:
      'A good website only works if people can find it. We help businesses improve their visibility on Google with a clear SEO audit, technical fixes, on-page optimisation and local SEO, with honest reporting on what is changing and why.',
    points: [
      'Complete SEO audit with a clear action list',
      'Technical SEO and Core Web Vitals',
      'On-page and keyword optimisation',
      'Local SEO and Google Business Profile',
      'Ranking and traffic reporting',
    ],
    features: [
      {
        title: 'SEO audit',
        desc: 'A detailed review of crawl issues, speed, mobile usability, content gaps and competitors, with a prioritised list of what to fix first.',
      },
      {
        title: 'Technical SEO',
        desc: 'Site speed, Core Web Vitals, indexing, sitemaps, structured data and clean URLs, so search engines can crawl and understand your site.',
      },
      {
        title: 'On-page optimisation',
        desc: 'Keyword research plus better titles, descriptions, headings and content, aimed at the searches your customers actually make.',
      },
      {
        title: 'Local SEO and ranking growth',
        desc: 'Google Business Profile, local listings and regular tracking, so customers in Bhopal or any target city can find you.',
      },
    ],
    tech: [
      'Google Search Console',
      'Google Analytics 4',
      'PageSpeed Insights',
      'Schema markup',
      'Keyword research',
    ],
    callout: {
      title: 'Honest, measurable SEO',
      text: 'We explain what we change and why, and report on real data from Search Console and Analytics. No one can honestly guarantee a number-one ranking, so we focus on the work that moves the needle.',
    },
    faqs: [
      {
        q: 'How long does SEO take to show results?',
        a: 'Technical fixes can show an effect within weeks, but meaningful ranking growth usually takes 3 to 6 months depending on competition and your starting point.',
      },
      {
        q: 'Can you guarantee a number-one ranking on Google?',
        a: 'No. Nobody can honestly guarantee that. We focus on proven work: technical health, relevant content, strong on-page SEO and local visibility, and we show you the data.',
      },
      {
        q: 'Do you do SEO for websites you did not build?',
        a: 'Yes. We can audit and optimise any website, whether it is on WordPress, Shopify, Wix, Next.js or another platform.',
      },
      {
        q: 'What do I receive from an SEO audit?',
        a: 'A clear report covering technical issues, speed, on-page problems and competitor gaps, along with a prioritised list of fixes and recommendations.',
      },
    ],
  },
];

export const CARD_SERVICES = [
  'custom-website-development',
  'platform-development',
  'seo-optimization',
  'app-development',
]
  .map((slug) => SERVICES.find((x) => x.slug === slug))
  .filter((x): x is Service => Boolean(x));

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
