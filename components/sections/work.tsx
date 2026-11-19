'use client';

import { ArrowUpRight } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { useInViewOnce } from '@/components/use-in-view';
import { cn } from '@/lib/utils';

interface Project {
  title: string;
  category: string;
  desc: string;
  tags: string[];
  visual: 'dashboard' | 'storefront' | 'corporate' | 'system';
  accent: string;
}

const projects: Project[] = [
  {
    title: 'Nimbus Analytics',
    category: 'SaaS Dashboard',
    desc: 'A real-time analytics platform with custom data visualizations and team collaboration.',
    tags: ['Next.js', 'TypeScript', 'Recharts', 'Node.js'],
    visual: 'dashboard',
    accent: '#C5F36B',
  },
  {
    title: 'Verde Commerce',
    category: 'E-commerce Platform',
    desc: 'A high-converting Shopify-based storefront with a custom headless front-end.',
    tags: ['Shopify', 'Next.js', 'Tailwind', 'GraphQL'],
    visual: 'storefront',
    accent: '#34d399',
  },
  {
    title: 'Atlas Corporate',
    category: 'Business Website',
    desc: 'A premium corporate website with an editorial layout and CMS-driven content.',
    tags: ['Next.js', 'Sanity', 'Framer Motion', 'Vercel'],
    visual: 'corporate',
    accent: '#60a5fa',
  },
  {
    title: 'Helios RMS',
    category: 'Custom Management System',
    desc: 'A reservation management system with role-based access and operational dashboards.',
    tags: ['React', 'Fastify', 'PostgreSQL', 'Redis'],
    visual: 'system',
    accent: '#fbbf24',
  },
];

export function Work() {
  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="relative py-16 sm:py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <SectionHeading
          tag="Selected Work"
          titleId="work-title"
          title="Selected Digital Experiences."
          description="Concept projects representing the kind of work we build. Replaceable with verified case studies when available."
          className="max-w-4xl"
        />

        <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-14 md:grid-cols-2 md:gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [ref, inView] = useInViewOnce<HTMLElement>();

  return (
    <article
      ref={ref}
      style={{ transitionDelay: `${(index % 2) * 0.1}s` }}
      className={cn(
        'rv group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors duration-500 hover:border-foreground/20',
        inView && 'rv-in'
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-bg">
        <ProjectVisual variant={project.visual} accent={project.accent} show={inView} />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6 md:p-7">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-foreground-muted sm:text-xs">
            {project.category}
          </span>
          <span className="text-xs text-foreground-muted">0{index + 1}</span>
        </div>
        <h3 className="mt-3 font-display text-xl font-semibold tracking-tight md:text-2xl">
          {project.title}
        </h3>
        <p className="mt-2.5 text-sm leading-relaxed text-foreground-muted">
          {project.desc}
        </p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <li
              key={t}
              className="rounded-full border border-border bg-bg px-3 py-1 text-xs text-foreground/70"
            >
              {t}
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          aria-label={`Start a project like ${project.title}`}
          className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-foreground/60 transition-colors group-hover:text-foreground"
        >
          <span>Start a similar project</span>
          <ArrowUpRight
            size={16}
            className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
          />
        </a>
      </div>
    </article>
  );
}

function ProjectVisual({
  variant,
  accent,
  show,
}: {
  variant: Project['visual'];
  accent: string;
  show: boolean;
}) {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-br from-bg to-surface-elevated transition-transform duration-700 group-hover:scale-105" />
      <div
        className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-90 sm:h-48 sm:w-48"
        style={{ backgroundColor: accent + '40' }}
      />
      <div className="absolute inset-0 flex items-center justify-center p-5 sm:p-8">
        <div className="w-full max-w-[17rem] transition-transform duration-500 group-hover:-translate-y-1">
          {variant === 'dashboard' && <DashboardMock accent={accent} show={show} />}
          {variant === 'storefront' && <StorefrontMock accent={accent} />}
          {variant === 'corporate' && <CorporateMock accent={accent} />}
          {variant === 'system' && <SystemMock accent={accent} />}
        </div>
      </div>
    </div>
  );
}

const BARS = [40, 65, 50, 85, 55, 72, 45];

function DashboardMock({ accent, show }: { accent: string; show: boolean }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-3 shadow-sm">
      <div className="flex items-center gap-1.5 pb-3">
        <span className="h-2 w-2 rounded-full bg-foreground/15" />
        <span className="h-2 w-2 rounded-full bg-foreground/15" />
        <span className="h-2 w-2 rounded-full bg-foreground/15" />
      </div>
      <div className="flex h-20 items-end justify-between gap-1.5 rounded-lg bg-bg p-3 sm:h-[90px]">
        {BARS.map((h, i) => (
          <span
            key={i}
            className="w-full max-w-3 origin-bottom rounded-t-sm transition-transform duration-700 ease-out"
            style={{
              height: `${h}%`,
              backgroundColor: accent,
              opacity: 0.75,
              transform: show ? 'scaleY(1)' : 'scaleY(0)',
              transitionDelay: `${0.1 + i * 0.07}s`,
            }}
          />
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <span className="h-2 flex-1 rounded-full bg-foreground/10" />
        <span className="h-2 w-12 rounded-full" style={{ backgroundColor: accent }} />
      </div>
    </div>
  );
}

function StorefrontMock({ accent }: { accent: string }) {
  return (
    <div className="flex gap-2">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="min-w-0 flex-1 rounded-xl border border-border bg-surface p-2.5 transition-transform duration-500 group-hover:-translate-y-1.5"
          style={{ transitionDelay: `${i * 0.06}s` }}
        >
          <div className="aspect-square rounded-lg" style={{ backgroundColor: accent + '25' }} />
          <div className="mt-2 h-1.5 w-3/4 rounded-full bg-foreground/15" />
          <div className="mt-1.5 h-1.5 w-1/2 rounded-full bg-foreground/10" />
          <div className="mt-2 h-3 w-10 rounded-full" style={{ backgroundColor: accent }} />
        </div>
      ))}
    </div>
  );
}

function CorporateMock({ accent }: { accent: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <div className="flex items-center justify-between">
        <span className="block h-3 w-16 rounded-full" style={{ backgroundColor: accent }} />
        <span className="flex gap-1.5">
          <span className="h-1.5 w-6 rounded-full bg-foreground/15" />
          <span className="h-1.5 w-6 rounded-full bg-foreground/15" />
          <span className="hidden h-1.5 w-6 rounded-full bg-foreground/15 min-[380px]:block" />
        </span>
      </div>
      <div className="mt-4 space-y-1.5">
        <div className="h-3 w-full rounded-full bg-foreground/15" />
        <div className="h-3 w-4/5 rounded-full bg-foreground/15" />
      </div>
      <div className="mt-3 h-12 rounded-lg sm:h-16" style={{ backgroundColor: accent + '18' }} />
      <div className="mt-3 flex gap-2">
        <span className="h-5 w-20 rounded-full" style={{ backgroundColor: accent }} />
        <span className="h-5 w-16 rounded-full border border-border" />
      </div>
    </div>
  );
}

function SystemMock({ accent }: { accent: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-3">
      <div className="flex items-center justify-between pb-2.5">
        <span className="h-2 w-20 rounded-full bg-foreground/15" />
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
      </div>
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex items-center gap-2 border-t border-border py-1.5 opacity-60 transition-opacity duration-500 group-hover:opacity-100 sm:py-2"
          style={{ transitionDelay: `${i * 0.05}s` }}
        >
          <span className="h-5 w-5 shrink-0 rounded-md" style={{ backgroundColor: accent + '30' }} />
          <span className="h-1.5 flex-1 rounded-full bg-foreground/10" />
          <span className="h-1.5 w-8 rounded-full" style={{ backgroundColor: accent }} />
        </div>
      ))}
    </div>
  );
}
