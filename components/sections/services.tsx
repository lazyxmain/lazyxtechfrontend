'use client';

import {
  Globe,
  LayoutGrid,
  ShoppingBag,
  Server,
  ArrowUpRight,
} from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { Reveal } from '@/components/reveal';
import { cn } from '@/lib/utils';

const services = [
  {
    n: '01',
    title: 'Website Development',
    icon: Globe,
    accent: 'from-lime/30 to-transparent',
    points: [
      'Business websites',
      'Corporate websites',
      'Landing pages',
      'High-performance Next.js websites',
    ],
    desc: 'Fast, conversion-focused websites that represent your brand with precision.',
  },
  {
    n: '02',
    title: 'Custom Web Application Development',
    icon: LayoutGrid,
    accent: 'from-sky-200/40 to-transparent',
    points: [
      'SaaS platforms',
      'CRM and ERP systems',
      'Admin dashboards',
      'Custom business applications',
    ],
    desc: 'Tailored software built around your operations and your users.',
  },
  {
    n: '03',
    title: 'E-commerce Development',
    icon: ShoppingBag,
    accent: 'from-orange-200/40 to-transparent',
    points: [
      'Shopify development',
      'Custom e-commerce platforms',
      'Storefront optimization',
      'E-commerce integrations',
    ],
    desc: 'Stores engineered for speed, conversion and scale.',
  },
  {
    n: '04',
    title: 'Backend & API Development',
    icon: Server,
    accent: 'from-violet-200/30 to-transparent',
    points: [
      'Node.js and Fastify development',
      'REST API development',
      'Database architecture',
      'Third-party integrations',
    ],
    desc: 'Robust APIs and data layers that power your product reliably.',
  },
];

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="relative py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <SectionHeading
          tag="What We Build"
          titleId="services-title"
          title="Focused digital capabilities to help businesses launch, scale and innovate."
          className="max-w-4xl"
        />

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          {services.map((s, i) => (
            <ServiceCard key={s.n} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  const Icon = service.icon;

  return (
    <Reveal delay={(index % 2) * 0.1} y={36} className="h-full">
      <article
        className={cn(
          'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-foreground/20 sm:p-7 md:p-9'
        )}
      >
        <div
          className={cn(
            'pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gradient-radial opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100',
            service.accent
          )}
        />

        <div className="relative flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-bg transition-colors duration-500 group-hover:border-lime group-hover:bg-lime/10">
            <Icon size={22} className="text-foreground" />
          </div>
          <span className="font-display text-sm font-medium text-foreground-muted">
            {service.n}
          </span>
        </div>

        <h3 className="relative mt-6 break-words font-display text-xl font-semibold leading-snug tracking-tight md:text-2xl">
          {service.title}
        </h3>
        <p className="relative mt-3 text-sm leading-relaxed text-foreground-muted sm:text-[0.95rem]">
          {service.desc}
        </p>

        <ul className="relative mt-6 space-y-2.5">
          {service.points.map((p) => (
            <li key={p} className="flex items-start gap-3 text-sm">
              <span className="mt-[0.6em] h-1 w-4 shrink-0 rounded-full bg-lime transition-all duration-300 group-hover:w-6" />
              <span className="text-foreground/80">{p}</span>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="relative mt-auto inline-flex items-center gap-2 pt-7 text-sm font-medium text-foreground/60 transition-colors group-hover:text-foreground"
          aria-label={`Discuss ${service.title}`}
        >
          <span>Learn more</span>
          <ArrowUpRight
            size={16}
            className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
          />
        </a>
      </article>
    </Reveal>
  );
}
