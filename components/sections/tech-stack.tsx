'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionHeading } from '@/components/section-heading';

const techs = [
  { name: 'React', group: 'Frontend' },
  { name: 'Next.js', group: 'Frontend' },
  { name: 'JavaScript', group: 'Language' },
  { name: 'TypeScript', group: 'Language' },
  { name: 'Tailwind CSS', group: 'Frontend' },
  { name: 'Node.js', group: 'Backend' },
  { name: 'Fastify', group: 'Backend' },
  { name: 'MongoDB', group: 'Database' },
  { name: 'MySQL', group: 'Database' },
  { name: 'Redis', group: 'Database' },
  { name: 'Shopify', group: 'Platform' },
  { name: 'Three.js', group: 'Frontend' },
];

export function TechStack() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* ambient */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-fade blur-3xl" />
      </div>

      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <SectionHeading
          tag="Technology"
          title="Built With Modern Technology."
          description="A curated ecosystem of reliable, proven tools — chosen to match each project's needs."
          align="center"
          className="mx-auto items-center"
        />

        <div className="mt-16 flex flex-wrap justify-center gap-3 md:gap-4">
          {techs.map((t, i) => (
            <TechPill key={t.name} name={t.name} group={t.group} index={i} />
          ))}
        </div>

        {/* marquee strip */}
        <div className="relative mt-16 overflow-hidden border-y border-border py-5">
          <div className="flex w-max animate-marquee gap-12">
            {[...techs, ...techs].map((t, i) => (
              <span
                key={i}
                className="font-display text-2xl font-medium tracking-tight text-foreground/30 transition-colors hover:text-foreground md:text-3xl"
              >
                {t.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TechPill({
  name,
  group,
  index,
}: {
  name: string;
  group: string;
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
      className="group flex items-center gap-3 rounded-2xl border border-border bg-surface px-5 py-3.5 transition-colors hover:border-lime"
    >
      <span
        className="flex h-8 w-8 items-center justify-center rounded-lg bg-bg font-display text-sm font-bold text-foreground transition-colors group-hover:bg-lime group-hover:text-lime-fg"
      >
        {name.charAt(0)}
      </span>
      <div className="flex flex-col">
        <span className="text-sm font-semibold tracking-tight">{name}</span>
        <span className="text-[10px] uppercase tracking-[0.12em] text-foreground-muted">
          {group}
        </span>
      </div>
    </motion.div>
  );
}
