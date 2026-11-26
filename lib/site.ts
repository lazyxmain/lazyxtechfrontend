/**
 * Single source of truth for company details + SEO.
 * Set NEXT_PUBLIC_SITE_URL in Netlify to the real production domain.
 */
const raw =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.URL ||
  'https://lazyxtech.com';

export const SITE_URL = raw.replace(/\/+$/, '');
export const SITE_NAME = 'LazyXTech';

export const COMPANY = {
  name: 'LazyXTech',
  email: 'lazyxcustomer@gmail.com',
  phone: '+919516366990',
  phoneDisplay: '+91 95163 66990',
  whatsapp: 'https://wa.me/919516366990',
  linkedin: 'https://www.linkedin.com/in/lazyx-teach-412125451',
  city: 'Bhopal',
  region: 'Madhya Pradesh',
  country: 'India',
  countryCode: 'IN',
  geo: { lat: 23.2599, lng: 77.4126 },
  supportMonths: 6,
} as const;

export const LOCATION_LABEL = `${COMPANY.city}, ${COMPANY.region}, ${COMPANY.country}`;

export const SITE_TITLE =
  'LazyXTech | Web, WordPress, Shopify & App Development Company in Bhopal';
export const SITE_DESCRIPTION =
  'LazyXTech is a Bhopal-based web and app development company. Custom Next.js & React websites, WordPress, Shopify and React Native (Expo) apps with 6 months of support after launch.';

/** Professional, pre-formatted client email (opens the visitor's mail app). */
export function buildMailto(opts?: {
  service?: string;
  name?: string;
  company?: string;
  phone?: string;
  budget?: string;
  details?: string;
}) {
  const o = opts ?? {};
  const subject = `Project Inquiry${o.service ? ` - ${o.service}` : ''} | LazyXTech`;
  const body = [
    'Hello LazyXTech Team,',
    '',
    'I would like to discuss a project with you. Details are below.',
    '',
    `Name: ${o.name ?? ''}`,
    `Company / Business: ${o.company ?? ''}`,
    `Phone / WhatsApp: ${o.phone ?? ''}`,
    `Service needed: ${o.service ?? '(Website / WordPress / Shopify / Mobile App)'}`,
    `Budget range: ${o.budget ?? ''}`,
    'Expected timeline: ',
    '',
    'About the project:',
    o.details ?? '',
    '',
    'Please share the next steps and an estimated quote.',
    '',
    'Thank you.',
  ].join('\n');
  return `mailto:${COMPANY.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export const FAQS = [
  {
    q: 'What services does LazyXTech offer?',
    a: 'We build custom websites with Next.js and React, WordPress and Shopify websites and stores, sites on platforms like Wix, Framer and Lovable, SEO optimization and audits, and cross-platform mobile apps with React Native and Expo. Every development project includes 6 months of support after launch.',
  },
  {
    q: 'Where is LazyXTech located?',
    a: 'We are based in Bhopal, Madhya Pradesh, India. We work with businesses in Bhopal and across India, as well as clients abroad, over phone, WhatsApp, email and video calls.',
  },
  {
    q: 'Which technologies do you use?',
    a: 'Next.js, React, TypeScript and Tailwind CSS for websites; WordPress for content sites; Shopify for e-commerce; React Native with Expo for Android and iOS apps; and Node.js for backend and APIs.',
  },
  {
    q: 'Do you build mobile apps?',
    a: 'Yes. We build Android and iOS apps from a single codebase using React Native and Expo, which keeps development faster and maintenance simpler than building two separate apps.',
  },
  {
    q: 'What support do I get after the project is delivered?',
    a: 'Every project comes with 6 months of support after launch, covering bug fixes, compatibility and security updates, small content or design changes, and help over phone, WhatsApp or email.',
  },
  {
    q: 'How long will my project take?',
    a: 'It depends on scope. As a rough guide, a business website or WordPress site takes 1 to 4 weeks, a Shopify store 2 to 4 weeks, and a mobile app 6 to 12 weeks or more. You get a clear timeline in the proposal before work starts.',
  },
  {
    q: 'How do I get a quote?',
    a: 'Call or WhatsApp us on +91 95163 66990, email lazyxcustomer@gmail.com, or fill in the contact form. Tell us what you need and we will reply within one business day with questions or a proposal.',
  },
  {
    q: 'Will my website rank on Google?',
    a: 'We build every site SEO-ready: fast loading, mobile-first, clean structure, proper meta tags and sitemap. Nobody can honestly guarantee a ranking, but a technically strong site gives you the best foundation to rank.',
  },
];
