import { useRef, type MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { Globe, LayoutGrid, ShoppingCart, ServerCog, ArrowUpRight } from 'lucide-react';
import { Reveal, SectionTag, RevealText, useReducedMotion } from './motion';

const SERVICES = [
  {
    num: '01',
    title: 'Website Development',
    desc: 'Business websites, corporate websites, landing pages and high-performance Next.js websites.',
    icon: Globe,
    accent: '#C5F36B',
  },
  {
    num: '02',
    title: 'Custom Web Application Development',
    desc: 'SaaS platforms, CRM and ERP systems, admin dashboards and custom business applications.',
    icon: LayoutGrid,
    accent: '#718CFF',
  },
  {
    num: '03',
    title: 'E-commerce Development',
    desc: 'Shopify development, custom e-commerce platforms, storefront optimization and integrations.',
    icon: ShoppingCart,
    accent: '#C5F36B',
  },
  {
    num: '04',
    title: 'Backend & API Development',
    desc: 'Node.js and Fastify development, REST APIs, database architecture and third-party integrations.',
    icon: ServerCog,
    accent: '#718CFF',
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const Icon = service.icon;

  const onMove = (e: MouseEvent) => {
    if (reduced || !ref.current || !glow.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    ref.current.style.setProperty('--mx', `${x}px`);
    ref.current.style.setProperty('--my', `${y}px`);
    glow.current.style.opacity = '1';
  };
  const onLeave = () => {
    if (glow.current) glow.current.style.opacity = '0';
  };

  return (
    <Reveal delay={index * 0.08}>
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="group relative h-full overflow-hidden rounded-3xl border border-line bg-ink-card p-8 transition-colors duration-500 hover:border-white/20 md:p-10"
        style={{ '--mx': '50%', '--my': '50%' } as React.CSSProperties}
      >
        {/* Cursor-following glow */}
        <div
          ref={glow}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500"
          style={{
            background: `radial-gradient(420px circle at var(--mx) var(--my), ${service.accent}14, transparent 65%)`,
          }}
        />
        {/* Top hairline that lights up */}
        <span
          aria-hidden="true"
          className="absolute inset-x-8 top-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100 glow-line"
        />

        <div className="relative z-10 flex h-full flex-col">
          <div className="flex items-start justify-between">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-2xl border border-line transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-3"
              style={{ background: `${service.accent}0d` }}
            >
              <Icon size={24} style={{ color: service.accent }} strokeWidth={1.6} />
            </div>
            <span className="font-mono text-sm text-chalk-dim/70">{service.num}</span>
          </div>

          <h3 className="mt-8 font-display text-xl font-semibold leading-snug text-chalk md:text-2xl">
            {service.title}
          </h3>
          <p className="mt-4 flex-1 text-[15px] leading-relaxed text-chalk-dim">{service.desc}</p>

          <div className="mt-8 flex items-center gap-2 text-sm font-medium text-chalk-dim transition-colors duration-300 group-hover:text-lime-electric">
            <span>Discuss this service</span>
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionTag index="01" label="Services" />
        <div className="mt-6 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <RevealText
            as="h2"
            text="What We Build."
            className="font-display text-4xl font-semibold tracking-tight md:text-6xl"
          />
          <Reveal delay={0.15}>
            <p className="max-w-sm text-[15px] leading-relaxed text-chalk-dim">
              Focused digital capabilities to help businesses launch, scale and innovate.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.num} service={s} index={i} />
          ))}
        </div>

        {/* Marquee divider */}
        <div className="mt-24 overflow-hidden border-y border-line py-5" aria-hidden="true">
          <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
            {Array.from({ length: 2 }).map((_, dup) => (
              <div key={dup} className="flex gap-10">
                {['Strategy', 'Design', 'Engineering', 'E-commerce', 'APIs', 'Scale', 'Performance', 'Support'].map(
                  (w) => (
                    <span key={w} className="flex items-center gap-10 font-display text-lg text-chalk-dim/60">
                      {w} <span className="text-lime-electric/60">✦</span>
                    </span>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
