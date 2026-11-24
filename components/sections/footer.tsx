'use client';

import Link from 'next/link';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { Magnetic } from '@/components/magnetic';
import { Reveal } from '@/components/reveal';
import { SERVICES } from '@/lib/services';
import { COMPANY, LOCATION_LABEL, buildMailto } from '@/lib/site';

const navLinks = [
  { label: 'Home', href: '/#home' },
  { label: 'Services', href: '/#services' },
  { label: 'Support', href: '/#support' },
  { label: 'About', href: '/#about' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Contact', href: '/#contact' },
];

const linkCls =
  'text-sm text-foreground/70 transition-colors hover:text-foreground';
const headCls =
  'text-xs font-semibold uppercase tracking-[0.14em] text-foreground-muted';

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-surface">
      <div className="mx-auto max-w-[1400px] px-5 py-12 sm:py-16 md:px-8 md:py-20">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 border-b border-border pb-12 md:flex-row md:items-center">
            <div>
              <p className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
                Ready to start your project?
              </p>
              <p className="mt-2 text-foreground-muted">
                Call, WhatsApp or email us. We reply within one business day.
              </p>
            </div>
            <Magnetic href="/#contact" strength={0.3}>
              <span className="group flex items-center gap-2 rounded-xl bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition-colors hover:bg-lime hover:text-lime-fg">
                Get a Free Quote
                <ArrowUpRight
                  size={16}
                  aria-hidden="true"
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </span>
            </Magnetic>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-10 sm:py-12 md:grid-cols-4 lg:grid-cols-5">
          {/* brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5" aria-label="LazyXTech home">
              <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-foreground text-background">
                <span className="font-display text-lg font-bold">L</span>
                <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-lime ring-2 ring-surface" />
              </span>
              <span className="font-display text-lg font-semibold tracking-tight">
                Lazy<span className="text-foreground-muted">X</span>Tech
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-foreground-muted">
              Web and app development company in Bhopal. Custom websites,
              WordPress, Shopify and React Native apps, with 6 months of
              support after launch.
            </p>
            <address className="mt-5 space-y-2.5 text-sm not-italic text-foreground/80">
              <div className="flex items-start gap-2.5">
                <MapPin size={15} aria-hidden="true" className="mt-0.5 shrink-0 text-foreground-muted" />
                <span>{LOCATION_LABEL}</span>
              </div>
              <a href={`tel:${COMPANY.phone}`} className="flex items-center gap-2.5 hover:text-foreground">
                <Phone size={15} aria-hidden="true" className="shrink-0 text-foreground-muted" />
                {COMPANY.phoneDisplay}
              </a>
              <a href={buildMailto()} className="flex items-center gap-2.5 break-all hover:text-foreground">
                <Mail size={15} aria-hidden="true" className="shrink-0 text-foreground-muted" />
                {COMPANY.email}
              </a>
            </address>
          </div>

          <nav aria-label="Footer navigation">
            <h3 className={headCls}>Navigation</h3>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className={linkCls}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services" className="lg:col-span-2">
            <h3 className={headCls}>Services</h3>
            <ul className="mt-4 space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    title={`${s.title} in Bhopal`}
                    className={linkCls}
                  >
                    {s.title.split(' (')[0]}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <a
                  href={COMPANY.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LazyXTech on LinkedIn"
                  className="group inline-flex items-center gap-1 text-sm text-foreground/70 transition-colors hover:text-foreground"
                >
                  LinkedIn
                  <ArrowUpRight
                    size={13}
                    aria-hidden="true"
                    className="opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                  />
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-border pt-8 text-center md:flex-row md:text-left">
          <p className="text-xs text-foreground-muted">
            © {new Date().getFullYear()} LazyXTech, Bhopal, India. All rights reserved.
          </p>
          <p className="text-xs text-foreground-muted">
            Websites · WordPress · Shopify · Mobile Apps
          </p>
        </div>
      </div>

      <div className="overflow-hidden">
        <div aria-hidden="true" className="select-none px-5 text-center">
          <span className="font-display text-[18vw] font-bold leading-[0.8] tracking-tighter text-foreground/[0.04] md:text-[14vw]">
            LazyXTech
          </span>
        </div>
      </div>
    </footer>
  );
}
