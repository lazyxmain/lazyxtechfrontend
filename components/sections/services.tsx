'use client';

import Link from 'next/link';
import { ArrowUpRight, Globe, LayoutTemplate, Search, Smartphone } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { Reveal } from '@/components/reveal';

const chip =
  'rounded-full border border-border bg-bg px-3 py-1 text-xs text-foreground/75';

const cardBase =
  'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-foreground/20 sm:p-7';

function IconBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-bg transition-colors duration-500 group-hover:border-lime group-hover:bg-lime/10">
      {children}
    </div>
  );
}

function Glow() {
  return (
    <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-lime/25 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
  );
}

function CardLink({ href, title, label }: { href: string; title: string; label: string }) {
  return (
    <Link
      href={href}
      title={title}
      className="relative mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-foreground/70 transition-colors after:absolute after:inset-0 group-hover:text-foreground"
    >
      <span>{label}</span>
      <ArrowUpRight
        size={16}
        aria-hidden="true"
        className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
      />
    </Link>
  );
}

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="relative py-16 sm:py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <SectionHeading
          tag="What We Build"
          titleId="services-title"
          title="Websites, Stores and Apps for Growing Businesses."
          description="From a first website to a full mobile app, we cover what a business in Bhopal and beyond needs to get online, get found and grow."
          className="max-w-4xl"
        />

        {/* Three cards in one line on desktop */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-14 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {/* 1. Custom websites */}
          <Reveal y={32} className="h-full">
            <article className={cardBase}>
              <Glow />
              <div className="relative flex items-start justify-between">
                <IconBox>
                  <Globe size={22} aria-hidden="true" />
                </IconBox>
                <span className="font-display text-sm font-medium text-foreground-muted">01</span>
              </div>
              <h3 className="relative mt-6 font-display text-xl font-semibold leading-snug tracking-tight md:text-2xl">
                Custom Website Development
              </h3>
              <p className="relative mt-3 text-sm leading-relaxed text-foreground-muted sm:text-[0.95rem]">
                Fast, SEO-ready websites built from scratch with Next.js and
                React, designed around your brand and your customers.
              </p>
              <ul className="relative mt-5 flex flex-wrap gap-2">
                {['Next.js', 'React', 'Business websites', 'Landing pages'].map((t) => (
                  <li key={t} className={chip}>{t}</li>
                ))}
              </ul>
              <CardLink
                href="/services/custom-website-development"
                title="Custom Website Development in Bhopal"
                label="Explore website development"
              />
            </article>
          </Reveal>

          {/* 2. WordPress, Shopify & other platforms */}
          <Reveal delay={0.08} y={32} className="h-full">
            <article className={cardBase}>
              <Glow />
              <div className="relative flex items-start justify-between">
                <IconBox>
                  <LayoutTemplate size={22} aria-hidden="true" />
                </IconBox>
                <span className="font-display text-sm font-medium text-foreground-muted">02</span>
              </div>
              <h3 className="relative mt-6 font-display text-xl font-semibold leading-snug tracking-tight md:text-2xl">
                WordPress, Shopify &amp; Other Platforms
              </h3>
              <p className="relative mt-3 text-sm leading-relaxed text-foreground-muted sm:text-[0.95rem]">
                Easy-to-manage websites and online stores on the platform that
                suits your business best, set up properly and ready to sell.
              </p>
              <ul className="relative mt-5 flex flex-wrap gap-2">
                {['WordPress', 'Shopify', 'Wix', 'Framer', 'Lovable', '& more'].map((t) => (
                  <li key={t} className={chip}>{t}</li>
                ))}
              </ul>
              <div className="relative mt-auto flex flex-wrap gap-x-6 gap-y-2 pt-6 text-sm font-medium">
                <Link
                  href="/services/wordpress-development"
                  title="WordPress Development in Bhopal"
                  className="inline-flex items-center gap-1.5 text-foreground/70 transition-colors hover:text-foreground"
                >
                  WordPress <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
                <Link
                  href="/services/shopify-development"
                  title="Shopify Development in Bhopal"
                  className="inline-flex items-center gap-1.5 text-foreground/70 transition-colors hover:text-foreground"
                >
                  Shopify <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </article>
          </Reveal>

          {/* 3. SEO */}
          <Reveal delay={0.16} y={32} className="h-full">
            <article className={cardBase}>
              <Glow />
              <div className="relative flex items-start justify-between">
                <IconBox>
                  <Search size={22} aria-hidden="true" />
                </IconBox>
                <span className="font-display text-sm font-medium text-foreground-muted">03</span>
              </div>
              <h3 className="relative mt-6 font-display text-xl font-semibold leading-snug tracking-tight md:text-2xl">
                SEO Optimization &amp; Web Ranking
              </h3>
              <p className="relative mt-3 text-sm leading-relaxed text-foreground-muted sm:text-[0.95rem]">
                Get found on Google with SEO audits, technical and on-page
                optimization and ranking-focused improvements for your website.
              </p>
              <ul className="relative mt-5 flex flex-wrap gap-2">
                {['SEO audits', 'On-page SEO', 'Technical SEO', 'Local SEO', 'Ranking'].map((t) => (
                  <li key={t} className={chip}>{t}</li>
                ))}
              </ul>
              <CardLink
                href="/services/seo-services"
                title="SEO Services in Bhopal"
                label="Explore SEO services"
              />
            </article>
          </Reveal>
        </div>

        {/* 4. Mobile apps: slim full-width strip under the three cards */}
        <Reveal delay={0.1} y={28} className="mt-4 sm:mt-5 lg:mt-6">
          <article className="group relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-foreground/20 sm:p-7 md:flex-row md:items-center md:gap-8">
            <Glow />
            <IconBox>
              <Smartphone size={22} aria-hidden="true" />
            </IconBox>
            <div className="relative min-w-0 md:flex-1">
              <div className="flex items-center gap-3">
                <h3 className="font-display text-xl font-semibold tracking-tight md:text-2xl">
                  Mobile App Development
                </h3>
                <span className="font-display text-sm font-medium text-foreground-muted">04</span>
              </div>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground-muted sm:text-[0.95rem]">
                Android and iOS apps from one codebase with React Native and
                Expo: faster to build and simpler to maintain.
              </p>
            </div>
            <ul className="relative flex flex-wrap gap-2 md:max-w-[16rem] md:justify-end">
              {['React Native', 'Expo', 'Android', 'iOS'].map((t) => (
                <li key={t} className={chip}>{t}</li>
              ))}
            </ul>
            <Link
              href="/services/app-development"
              title="Mobile App Development in Bhopal (React Native & Expo)"
              className="relative inline-flex items-center gap-2 text-sm font-medium text-foreground/70 transition-colors after:absolute after:inset-0 group-hover:text-foreground md:shrink-0"
            >
              <span>Explore app development</span>
              <ArrowUpRight
                size={16}
                aria-hidden="true"
                className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </Link>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
