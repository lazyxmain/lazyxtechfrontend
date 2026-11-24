import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight, Check, Mail, Phone, ShieldCheck } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/sections/footer';
import { Reveal, SmokeText } from '@/components/reveal';
import { SectionTag } from '@/components/section-heading';
import { ServiceIconView } from '@/components/service-icon';
import { SERVICES, getService } from '@/lib/services';
import {
  COMPANY,
  LOCATION_LABEL,
  SITE_NAME,
  SITE_URL,
  buildMailto,
} from '@/lib/site';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const s = getService(params.slug);
  if (!s) return {};
  const url = `/services/${s.slug}`;
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    keywords: s.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: `${s.metaTitle} | ${SITE_NAME}`,
      description: s.metaDescription,
      url,
      type: 'website',
      locale: 'en_IN',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: `${s.title} in Bhopal by LazyXTech`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${s.metaTitle} | ${SITE_NAME}`,
      description: s.metaDescription,
      images: ['/og-image.png'],
    },
  };
}

export default function ServicePage({ params }: Props) {
  const s = getService(params.slug);
  if (!s) notFound();

  const url = `${SITE_URL}/services/${s.slug}`;
  const others = SERVICES.filter((o) => o.slug !== s.slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: s.title,
        serviceType: s.title,
        description: s.metaDescription,
        url,
        provider: { '@id': `${SITE_URL}/#localbusiness` },
        areaServed: [
          { '@type': 'City', name: COMPANY.city },
          { '@type': 'Country', name: COMPANY.country },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/#services` },
          { '@type': 'ListItem', position: 3, name: s.title, item: url },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: s.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="relative">
        {/* Hero */}
        <section
          aria-labelledby="service-title"
          className="relative overflow-hidden pt-28 sm:pt-32 md:pt-36"
        >
          <div className="pointer-events-none absolute -right-32 top-10 -z-10 h-[420px] w-[420px] rounded-full bg-accent-fade" />
          <div className="mx-auto max-w-[1400px] px-5 pb-14 md:px-8 md:pb-20">
            <nav aria-label="Breadcrumb" className="text-xs text-foreground-muted sm:text-sm">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-foreground">Home</Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/#services" className="hover:text-foreground">Services</Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-foreground" aria-current="page">{s.title.split(' (')[0]}</li>
              </ol>
            </nav>

            <div className="mt-8 grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16">
              <div className="min-w-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface">
                  <ServiceIconView name={s.icon} />
                </div>
                <h1
                  id="service-title"
                  className="hero-in mt-6 text-balance font-display text-[2rem] font-semibold leading-[1.08] tracking-ultra sm:text-5xl lg:text-[3.6rem]"
                >
                  {s.h1}
                </h1>
                <p className="hero-in mt-6 max-w-2xl text-base leading-relaxed text-foreground-muted sm:text-lg" style={{ '--d': '0.1s' } as React.CSSProperties}>
                  {s.intro}
                </p>

                <div className="hero-in mt-8 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap" style={{ '--d': '0.2s' } as React.CSSProperties}>
                  <a
                    href={buildMailto({ service: s.title })}
                    title={`Email LazyXTech about ${s.title}`}
                    className="group flex items-center justify-center gap-2 rounded-xl bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition-colors hover:bg-lime hover:text-lime-fg"
                  >
                    <Mail size={17} aria-hidden="true" />
                    Get a Free Quote
                  </a>
                  <a
                    href={`tel:${COMPANY.phone}`}
                    title={`Call LazyXTech on ${COMPANY.phoneDisplay}`}
                    className="flex items-center justify-center gap-2 rounded-xl border border-border bg-surface/40 px-7 py-3.5 text-sm font-semibold transition-colors hover:border-foreground/30"
                  >
                    <Phone size={17} aria-hidden="true" />
                    {COMPANY.phoneDisplay}
                  </a>
                </div>
              </div>

              <aside className="rounded-2xl border border-border bg-surface p-6 sm:p-7">
                <h2 className="font-display text-lg font-semibold tracking-tight">
                  What you get
                </h2>
                <ul className="mt-5 space-y-3">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-sm">
                      <Check size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-foreground" />
                      <span className="text-foreground/80">{p}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-3 text-sm">
                    <ShieldCheck size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-foreground" />
                    <span className="font-medium">{COMPANY.supportMonths} months of post-launch support</span>
                  </li>
                </ul>
                <p className="mt-5 border-t border-border pt-4 text-xs text-foreground-muted">
                  Based in {LOCATION_LABEL}. Serving clients across India and worldwide.
                </p>
              </aside>
            </div>
          </div>
        </section>

        {/* Features */}
        <section aria-labelledby="features-title" className="py-14 sm:py-20 md:py-24">
          <div className="mx-auto max-w-[1400px] px-5 md:px-8">
            <SectionTag>Why choose us</SectionTag>
            <SmokeText
              as="h2"
              id="features-title"
              text={`${s.title.split(' (')[0]}, Done Properly.`}
              className="mt-5 max-w-3xl text-balance font-display text-[1.75rem] font-semibold leading-[1.12] tracking-tightest sm:text-4xl"
            />
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
              {s.features.map((f, i) => (
                <Reveal key={f.title} delay={(i % 2) * 0.08} y={24} className="h-full">
                  <div className="h-full rounded-2xl border border-border bg-surface p-6 sm:p-8">
                    <span className="font-display text-sm font-medium text-foreground-muted">
                      0{i + 1}
                    </span>
                    <h3 className="mt-3 font-display text-xl font-semibold tracking-tight">
                      {f.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-foreground-muted sm:text-base">
                      {f.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Tech + support */}
        <section aria-labelledby="tech-title" className="py-6 sm:py-10">
          <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-5 px-5 md:grid-cols-2 md:px-8">
            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
              <h2 id="tech-title" className="font-display text-xl font-semibold tracking-tight">
                Technology we use
              </h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {s.tech.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-border bg-bg px-4 py-1.5 text-sm text-foreground/80"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-foreground p-6 text-background sm:p-8">
              <h2 className="font-display text-xl font-semibold tracking-tight">
                {COMPANY.supportMonths} months of support after launch
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-background/70 sm:text-base">
                Bug fixes, compatibility and security updates, small content or design
                changes, and direct help by phone, WhatsApp or email for six months
                after your project goes live.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section aria-labelledby="faq-title" className="py-14 sm:py-20 md:py-24">
          <div className="mx-auto max-w-[1000px] px-5 md:px-8">
            <SectionTag>FAQ</SectionTag>
            <SmokeText
              as="h2"
              id="faq-title"
              text="Common Questions"
              className="mt-5 font-display text-[1.75rem] font-semibold leading-[1.12] tracking-tightest sm:text-4xl"
            />
            <div className="mt-8 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface">
              {s.faqs.map((f) => (
                <details key={f.q} className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left font-display text-base font-semibold tracking-tight transition-colors hover:bg-bg sm:px-7 sm:py-5 sm:text-lg [&::-webkit-details-marker]:hidden">
                    <span className="min-w-0">{f.q}</span>
                    <span
                      aria-hidden="true"
                      className="shrink-0 text-xl leading-none text-foreground-muted transition-transform duration-300 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="px-5 pb-5 text-sm leading-relaxed text-foreground-muted sm:px-7 sm:pb-6 sm:text-base">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Other services + CTA */}
        <section aria-labelledby="more-title" className="pb-16 sm:pb-24">
          <div className="mx-auto max-w-[1400px] px-5 md:px-8">
            <h2 id="more-title" className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
              Other services
            </h2>
            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={`/services/${o.slug}`}
                    title={`${o.title} in Bhopal`}
                    className="group flex h-full items-center justify-between gap-3 rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-foreground/30"
                  >
                    <span className="font-display font-semibold tracking-tight">
                      {o.title.split(' (')[0]}
                    </span>
                    <ArrowUpRight
                      size={18}
                      aria-hidden="true"
                      className="shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-3xl border border-border bg-surface p-6 text-center sm:p-10">
              <p className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                Ready to start?
              </p>
              <p className="mx-auto mt-3 max-w-xl text-foreground-muted">
                Tell us about your project. We will reply within one business day.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 min-[420px]:flex-row">
                <Link
                  href="/#contact"
                  className="rounded-xl bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition-colors hover:bg-lime hover:text-lime-fg"
                >
                  Contact Us
                </Link>
                <a
                  href={COMPANY.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Message LazyXTech on WhatsApp"
                  className="rounded-xl border border-border px-7 py-3.5 text-sm font-semibold transition-colors hover:border-foreground/40"
                >
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
