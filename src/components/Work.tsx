import { useRef, type MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Reveal, SectionTag, RevealText, useReducedMotion } from './motion';

/* Concept previews: each is a small coded composition, no client claims */
function PreviewBusiness() {
  return (
    <div className="absolute inset-0 flex items-end">
      <div className="mx-auto mb-0 flex h-[78%] w-[74%] items-start justify-center rounded-t-xl border border-white/15 bg-ink-soft/90 p-3 shadow-2xl">
        <div className="w-full space-y-2">
          <div className="h-1.5 w-1/2 rounded bg-lime-electric/70" />
          <div className="h-1 w-3/4 rounded bg-white/20" />
          <div className="h-1 w-2/3 rounded bg-white/10" />
          <div className="mt-3 grid grid-cols-3 gap-1.5">
            <div className="h-8 rounded bg-white/[0.07]" />
            <div className="h-8 rounded bg-white/[0.07]" />
            <div className="h-8 rounded bg-lime-electric/20" />
          </div>
        </div>
      </div>
    </div>
  );
}

function PreviewDashboard() {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-8">
      <div className="w-full rounded-xl border border-white/15 bg-ink-soft/90 p-4 shadow-2xl">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-voltage/70" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
        </div>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {['#718CFF44', '#C5F36B55', '#FFFFFF12', '#FFFFFF12'].map((c, i) => (
            <div key={i} className="h-9 rounded-md border border-white/10" style={{ background: c }} />
          ))}
        </div>
        <svg viewBox="0 0 200 48" className="mt-3 w-full">
          <polyline
            points="0,40 25,34 50,37 75,24 100,28 125,15 150,20 175,9 200,12"
            fill="none"
            stroke="#C5F36B"
            strokeWidth="2"
          />
          <polyline
            points="0,44 25,42 50,40 75,38 100,36 125,37 150,33 175,30 200,28"
            fill="none"
            stroke="#718CFF"
            strokeWidth="1.5"
            opacity="0.6"
          />
        </svg>
      </div>
    </div>
  );
}

function PreviewCommerce() {
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-4 p-8">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          initial={false}
          className="w-1/3 rounded-lg border border-white/15 bg-ink-soft/90 p-2 shadow-xl"
          style={{ transform: `translateY(${i === 1 ? -10 : 0}px)` }}
        >
          <div className={`h-12 rounded ${i === 1 ? 'bg-lime-electric/25' : 'bg-white/[0.08]'}`} />
          <div className="mt-2 h-1.5 w-3/4 rounded bg-white/20" />
          <div className="mt-1.5 h-1.5 w-1/2 rounded bg-lime-electric/60" />
        </motion.div>
      ))}
    </div>
  );
}

function PreviewManagement() {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-8">
      <div className="grid w-full grid-cols-3 gap-2.5">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`rounded-lg border border-white/10 p-2.5 ${i % 4 === 0 ? 'bg-voltage/15' : 'bg-ink-soft/90'}`}
            style={{ gridColumn: i === 0 ? 'span 2' : 'span 1' }}
          >
            <div className="h-1.5 w-2/3 rounded bg-white/20" />
            <div className="mt-1.5 flex gap-1">
              <span className="h-1 w-4 rounded bg-lime-electric/60" />
              <span className="h-1 w-3 rounded bg-white/15" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const PROJECTS = [
  {
    category: 'Business Website',
    title: 'Corporate Presence Platform',
    desc: 'Concept build — a fast, editorial marketing site for an international B2B brand.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    Preview: PreviewBusiness,
  },
  {
    category: 'SaaS Dashboard',
    title: 'Analytics Operations Console',
    desc: 'Concept build — a data-dense SaaS dashboard with realtime metrics and reporting.',
    tags: ['React', 'Node.js', 'Redis'],
    Preview: PreviewDashboard,
  },
  {
    category: 'E-commerce Platform',
    title: 'Omnichannel Storefront',
    desc: 'Concept build — a conversion-focused storefront with Shopify-backed inventory.',
    tags: ['Shopify', 'React', 'Fastify'],
    Preview: PreviewCommerce,
  },
  {
    category: 'Custom Management System',
    title: 'Logistics Workflow Suite',
    desc: 'Concept build — an internal tool orchestrating shipments, teams and approvals.',
    tags: ['TypeScript', 'MongoDB', 'REST APIs'],
    Preview: PreviewManagement,
  },
];

function ProjectCard({ p, index }: { p: (typeof PROJECTS)[number]; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const Preview = p.Preview;

  const onMove = (e: MouseEvent) => {
    if (reduced) return;
    const img = ref.current?.querySelector('[data-preview]') as HTMLElement | null;
    if (img) {
      const r = ref.current!.getBoundingClientRect();
      const dx = (e.clientX - r.left) / r.width - 0.5;
      const dy = (e.clientY - r.top) / r.height - 0.5;
      img.style.transform = `scale(1.07) translate(${dx * -10}px, ${dy * -10}px)`;
    }
  };
  const onLeave = () => {
    const img = ref.current?.querySelector('[data-preview]') as HTMLElement | null;
    if (img) img.style.transform = 'scale(1) translate(0,0)';
  };

  return (
    <Reveal delay={(index % 2) * 0.1}>
      <article
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        data-cursor="view"
        className={`group ${index % 2 === 1 ? 'md:translate-y-16' : ''}`}
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-line bg-ink-soft transition-colors duration-500 group-hover:border-white/20">
          <div
            data-preview
            className="absolute inset-0 transition-transform duration-500 ease-out"
            style={{ transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}
          >
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  index % 2 === 0
                    ? 'radial-gradient(80% 90% at 70% 20%, rgba(197,243,107,0.09), transparent 60%)'
                    : 'radial-gradient(80% 90% at 30% 80%, rgba(113,140,255,0.10), transparent 60%)',
              }}
            />
            <Preview />
          </div>
          {/* Hover veil + CTA */}
          <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-ink/80 via-transparent to-transparent p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <span className="inline-flex items-center gap-2 rounded-full bg-lime-electric px-5 py-2.5 font-display text-sm font-semibold text-ink">
              View Project <ArrowUpRight size={15} />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-chalk-dim">
              Concept
            </span>
          </div>
        </div>

        <div className="mt-6 flex flex-col justify-between gap-3 md:flex-row md:items-start">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-lime-electric">
              {p.category}
            </span>
            <h3 className="mt-2 font-display text-xl font-semibold text-chalk md:text-2xl">{p.title}</h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-chalk-dim">{p.desc}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-chalk-dim"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function Work() {
  return (
    <section id="work" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionTag index="04" label="Selected Work" />
        <div className="mt-6 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <RevealText
            as="h2"
            text="Work That Speaks Through Technology."
            className="max-w-2xl font-display text-4xl font-semibold leading-[1.1] tracking-tight md:text-6xl"
          />
          <Reveal delay={0.15}>
            <p className="max-w-xs text-[15px] leading-relaxed text-chalk-dim">
              Concept explorations of the product categories we build. Verified case studies
              available on request.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2 md:pb-16">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
