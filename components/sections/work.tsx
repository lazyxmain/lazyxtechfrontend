'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
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
    <section id="work" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <SectionHeading
          tag="Selected Work"
          title="Selected Digital Experiences."
          description="Concept projects representing the kind of work we build. Replaceable with verified case studies when available."
          className="max-w-4xl"
        />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      data-cursor="view"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-border bg-surface',
        'transition-colors duration-500 hover:border-foreground/20'
      )}
    >
      {/* Visual preview */}
      <div className="relative aspect-[16/10] overflow-hidden bg-bg">
        <ProjectVisual variant={project.visual} accent={project.accent} hovered={hovered} />
      </div>

      {/* Content */}
      <div className="p-6 md:p-7">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-[0.14em] text-foreground-muted">
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

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-border bg-bg px-3 py-1 text-xs text-foreground/70"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-2 text-sm font-medium text-foreground/60 transition-colors group-hover:text-foreground">
          <span>View Project</span>
          <ArrowUpRight
            size={16}
            className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </div>
      </div>
    </motion.article>
  );
}

function ProjectVisual({
  variant,
  accent,
  hovered,
}: {
  variant: Project['visual'];
  accent: string;
  hovered: boolean;
}) {
  return (
    <div className="absolute inset-0">
      {/* base gradient */}
      <div
        className="absolute inset-0 transition-transform duration-700"
        style={{
          transform: hovered ? 'scale(1.06)' : 'scale(1)',
          background:
            'linear-gradient(135deg, hsl(var(--bg)) 0%, hsl(var(--surface-elevated)) 100%)',
        }}
      />
      {/* accent glow */}
      <div
        className="absolute -right-10 -top-10 h-48 w-48 rounded-full blur-3xl transition-opacity duration-500"
        style={{
          backgroundColor: accent + '40',
          opacity: hovered ? 0.9 : 0.4,
        }}
      />

      {/* variant-specific abstract UI */}
      <div className="absolute inset-0 flex items-center justify-center p-8">
        {variant === 'dashboard' && <DashboardMock accent={accent} hovered={hovered} />}
        {variant === 'storefront' && <StorefrontMock accent={accent} hovered={hovered} />}
        {variant === 'corporate' && <CorporateMock accent={accent} hovered={hovered} />}
        {variant === 'system' && <SystemMock accent={accent} hovered={hovered} />}
      </div>
    </div>
  );
}

function Bar({ h, delay, accent }: { h: string; delay: number; accent: string }) {
  return (
    <motion.div
      className="w-3 rounded-t-sm"
      style={{ backgroundColor: accent, opacity: 0.7 }}
      initial={{ height: 0 }}
      whileInView={{ height: h }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
    />
  );
}

function DashboardMock({ accent, hovered }: { accent: string; hovered: boolean }) {
  return (
    <div
      className="w-full max-w-xs rounded-xl border border-border bg-surface p-3 shadow-sm transition-transform duration-500"
      style={{ transform: hovered ? 'translateY(-4px)' : 'translateY(0)' }}
    >
      <div className="flex items-center gap-1.5 pb-3">
        <div className="h-2 w-2 rounded-full bg-foreground/15" />
        <div className="h-2 w-2 rounded-full bg-foreground/15" />
        <div className="h-2 w-2 rounded-full bg-foreground/15" />
      </div>
      <div className="flex items-end justify-between gap-1.5 rounded-lg bg-bg p-3" style={{ height: 90 }}>
        <Bar h="40%" delay={0.1} accent={accent} />
        <Bar h="65%" delay={0.18} accent={accent} />
        <Bar h="50%" delay={0.26} accent={accent} />
        <Bar h="85%" delay={0.34} accent={accent} />
        <Bar h="55%" delay={0.42} accent={accent} />
        <Bar h="72%" delay={0.5} accent={accent} />
        <Bar h="45%" delay={0.58} accent={accent} />
      </div>
      <div className="mt-3 flex gap-2">
        <div className="h-2 flex-1 rounded-full bg-foreground/10" />
        <div className="h-2 w-12 rounded-full" style={{ backgroundColor: accent }} />
      </div>
    </div>
  );
}

function StorefrontMock({ accent, hovered }: { accent: string; hovered: boolean }) {
  return (
    <div className="flex w-full max-w-xs gap-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-xl border border-border bg-surface p-2.5"
          animate={{ y: hovered ? -6 : 0 }}
          transition={{ duration: 0.5, delay: i * 0.06 }}
        >
          <div className="aspect-square rounded-lg" style={{ backgroundColor: accent + '25' }} />
          <div className="mt-2 h-1.5 w-3/4 rounded-full bg-foreground/15" />
          <div className="mt-1.5 h-1.5 w-1/2 rounded-full bg-foreground/10" />
          <div className="mt-2 h-3 w-10 rounded-full" style={{ backgroundColor: accent }} />
        </motion.div>
      ))}
    </div>
  );
}

function CorporateMock({ accent, hovered }: { accent: string; hovered: boolean }) {
  return (
    <div
      className="w-full max-w-xs rounded-xl border border-border bg-surface p-4 transition-transform duration-500"
      style={{ transform: hovered ? 'translateY(-4px)' : 'translateY(0)' }}
    >
      <div className="flex items-center justify-between">
        <div className="h-3 w-16 rounded-full" style={{ backgroundColor: accent }} />
        <div className="flex gap-1.5">
          <div className="h-1.5 w-6 rounded-full bg-foreground/15" />
          <div className="h-1.5 w-6 rounded-full bg-foreground/15" />
          <div className="h-1.5 w-6 rounded-full bg-foreground/15" />
        </div>
      </div>
      <div className="mt-4 space-y-1.5">
        <div className="h-3 w-full rounded-full bg-foreground/15" />
        <div className="h-3 w-4/5 rounded-full bg-foreground/15" />
      </div>
      <div className="mt-3 h-16 rounded-lg" style={{ backgroundColor: accent + '18' }} />
      <div className="mt-3 flex gap-2">
        <div className="h-5 w-20 rounded-full" style={{ backgroundColor: accent }} />
        <div className="h-5 w-16 rounded-full border border-border" />
      </div>
    </div>
  );
}

function SystemMock({ accent, hovered }: { accent: string; hovered: boolean }) {
  return (
    <div
      className="w-full max-w-xs rounded-xl border border-border bg-surface p-3 transition-transform duration-500"
      style={{ transform: hovered ? 'translateY(-4px)' : 'translateY(0)' }}
    >
      <div className="flex items-center justify-between pb-2.5">
        <div className="h-2 w-20 rounded-full bg-foreground/15" />
        <div className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
      </div>
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="flex items-center gap-2 border-t border-border py-2"
          animate={{ opacity: hovered ? 1 : 0.6 }}
          transition={{ delay: i * 0.05 }}
        >
          <div className="h-5 w-5 rounded-md" style={{ backgroundColor: accent + '30' }} />
          <div className="h-1.5 flex-1 rounded-full bg-foreground/12" />
          <div className="h-1.5 w-8 rounded-full" style={{ backgroundColor: accent }} />
        </motion.div>
      ))}
    </div>
  );
}
