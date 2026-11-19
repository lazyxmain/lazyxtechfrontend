'use client';

import { SectionHeading } from '@/components/section-heading';
import { Reveal } from '@/components/reveal';

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
];

export function TechStack() {
  return (
    <section
      id="technology"
      aria-labelledby="tech-title"
      className="relative overflow-hidden py-16 sm:py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[90vw] max-w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-fade sm:h-[400px]" />
      </div>

      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <SectionHeading
          tag="Technology"
          titleId="tech-title"
          title="Built With Modern Technology."
          description="A curated ecosystem of reliable, proven tools, chosen to match each project's needs."
          align="center"
          className="mx-auto items-center"
        />

        <ul className="mt-10 grid grid-cols-2 gap-2.5 sm:mt-16 sm:flex sm:flex-wrap sm:justify-center sm:gap-4">
          {techs.map((t, i) => (
            <li key={t.name} className="min-w-0">
              <Reveal delay={(i % 6) * 0.05} y={18}>
                <div className="group flex items-center gap-3 rounded-2xl border border-border bg-surface px-3.5 py-3 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-lime sm:px-5 sm:py-3.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-bg font-display text-sm font-bold text-foreground transition-colors group-hover:bg-lime group-hover:text-lime-fg">
                    {t.name.charAt(0)}
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span className="truncate text-sm font-semibold tracking-tight">
                      {t.name}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.12em] text-foreground-muted">
                      {t.group}
                    </span>
                  </span>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        {/* marquee strip (decorative) */}
        <div
          aria-hidden="true"
          className="relative mt-12 overflow-hidden border-y border-border py-4 sm:mt-16 sm:py-5"
        >
          <div className="flex w-max animate-marquee gap-8 sm:gap-12">
            {[...techs, ...techs].map((t, i) => (
              <span
                key={i}
                className="font-display text-xl font-medium tracking-tight text-foreground/30 sm:text-2xl md:text-3xl"
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
