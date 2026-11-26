'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { Reveal } from '@/components/reveal';
import { ServiceIconView } from '@/components/service-icon';
import { CARD_SERVICES } from '@/lib/services';

const accents = [
  'from-lime/30 to-transparent',
  'from-sky-200/40 to-transparent',
  'from-orange-200/40 to-transparent',
  'from-violet-200/30 to-transparent',
];

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
          title="Websites, Stores, Apps and SEO for Growing Businesses."
          description="From a first website to a full mobile app, plus the SEO to get found on Google. Four core services covering what a business in Bhopal and beyond needs to grow online. Development projects include 6 months of support after launch."
          className="max-w-4xl"
        />

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-14 sm:gap-5 md:grid-cols-2 md:gap-6">
          {CARD_SERVICES.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 2) * 0.1} y={36} className="h-full">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-foreground/20 sm:p-7 md:p-9">
                <div
                  className={`pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gradient-radial opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100 ${accents[i % accents.length]}`}
                />

                <div className="relative flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-bg transition-colors duration-500 group-hover:border-lime group-hover:bg-lime/10">
                    <ServiceIconView name={s.icon} className="text-foreground" />
                  </div>
                  <span className="font-display text-sm font-medium text-foreground-muted">
                    {s.n}
                  </span>
                </div>

                <h3 className="relative mt-6 break-words font-display text-xl font-semibold leading-snug tracking-tight md:text-2xl">
                  {s.title}
                </h3>
                <p className="relative mt-3 text-sm leading-relaxed text-foreground-muted sm:text-[0.95rem]">
                  {s.short}
                </p>

                <ul className="relative mt-6 space-y-2.5">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-sm">
                      <span className="mt-[0.6em] h-1 w-4 shrink-0 rounded-full bg-lime transition-all duration-300 group-hover:w-6" />
                      <span className="text-foreground/80">{p}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/services/${s.slug}`}
                  title={`${s.title} in Bhopal`}
                  aria-label={`Learn more about ${s.title}`}
                  className="relative mt-auto inline-flex items-center gap-2 pt-7 text-sm font-medium text-foreground/70 transition-colors after:absolute after:inset-0 group-hover:text-foreground"
                >
                  <span>Learn more</span>
                  <ArrowUpRight
                    size={16}
                    aria-hidden="true"
                    className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
