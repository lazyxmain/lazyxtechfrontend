import './globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import {
  COMPANY,
  LOCATION_LABEL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from '@/lib/site';
import { SERVICES } from '@/lib/services';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const display = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['500', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  viewport: { width: 'device-width', initialScale: 1 },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F8F8F5' },
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0A' },
  ],
  keywords: [
    'web development company in Bhopal',
    'website development Bhopal',
    'WordPress developer in Bhopal',
    'Shopify developer in Bhopal',
    'app development company in Bhopal',
    'React Native developer Bhopal',
    'Next.js developer Bhopal',
    'custom website development Madhya Pradesh',
    'mobile app development India',
    'LazyXTech',
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: '/' },
  category: 'technology',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: '/',
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_IN',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'LazyXTech - Web, WordPress, Shopify and App Development Company in Bhopal',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/og-image.png'],
  },
  formatDetection: { telephone: false, email: false, address: false },
};

const address = {
  '@type': 'PostalAddress',
  addressLocality: COMPANY.city,
  addressRegion: COMPANY.region,
  addressCountry: COMPANY.countryCode,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/icon.svg`,
      email: COMPANY.email,
      telephone: COMPANY.phone,
      address,
      sameAs: [COMPANY.linkedin],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: COMPANY.phone,
        email: COMPANY.email,
        contactType: 'customer support',
        areaServed: ['IN', 'US', 'GB', 'CA', 'AU', 'AE'],
        availableLanguage: ['English', 'Hindi'],
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: 'en-IN',
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/#localbusiness`,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      image: `${SITE_URL}/og-image.png`,
      email: COMPANY.email,
      telephone: COMPANY.phone,
      address,
      geo: {
        '@type': 'GeoCoordinates',
        latitude: COMPANY.geo.lat,
        longitude: COMPANY.geo.lng,
      },
      areaServed: [
        { '@type': 'City', name: COMPANY.city },
        { '@type': 'State', name: COMPANY.region },
        { '@type': 'Country', name: COMPANY.country },
      ],
      knowsAbout: [
        'Website development',
        'WordPress development',
        'Shopify development',
        'React Native app development',
        'Next.js',
      ],
      sameAs: [COMPANY.linkedin],
      parentOrganization: { '@id': `${SITE_URL}/#organization` },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: `Web and app development services in ${LOCATION_LABEL}`,
        itemListElement: SERVICES.map((s) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: s.title,
            url: `${SITE_URL}/services/${s.slug}`,
          },
        })),
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-IN"
      suppressHydrationWarning
      className={`${sans.variable} ${display.variable}`}
    >
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}\n          <Analytics />\n          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
