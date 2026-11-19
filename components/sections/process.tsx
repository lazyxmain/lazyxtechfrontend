'use client';

import { Search, Map, Code, Rocket, LifeBuoy } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { Reveal } from '@/components/reveal';

const steps = [
  { n: '01', title: 'Discover', desc: 'Understand your business, goals and requirements.', icon: Search },
  { n: '02', title: 'Strategize', desc: 'Define the solution, scope and development roadmap.', icon: Map },
  { n: '03', title: 'Design & Build', desc: 'Create and develop the digital product.', icon: Code },
  { n: '04', title: 'Launch', desc: 'Test, deploy and deliver the final solution.', icon: Rocket },
  { n: '05', title: 'Support & Scale', desc: 'Continue improving and supporting the product.', icon: LifeBuoy },
];

export function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className="relative py-16 sm:py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <SectionHeading
          tag="Our Process"
          titleId="process-title"
          title="From First Conversation to Final Launch."
          className="max-w-4xl"
        />

        <ol className="relative mt-12 flex flex-col gap-10 sm:mt-16 md:gap-14">
          {/* vertical track */}
          <span
            aria-hidden="true"
            className="absolute bottom-2 left-5 top-2 w-px bg-border md:left-1/2 md:-translate-x-1/2"
          />
          {steps.map((step, i) => {
            const isRight = i % 2 === 1;
            const Icon = step.icon;
            return (
              <li key={step.n} className="relative">
                <Reveal y={32}>
                  <div className="relative flex items-start gap-5 md:grid md:grid-cols-2 md:items-center md:gap-0">
                    <span className="absolute left-0 top-0 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface md:left-1/2 md:-translate-x-1/2">
                      <span className="h-3 w-3 rounded-full bg-lime" />
                    </span>

                    <div
                      className={`ml-14 min-w-0 md:ml-0 ${
                        isRight
                          ? 'md:col-start-2 md:pl-16'
                          : 'md:col-start-1 md:pr-16 md:text-right'
                      }`}
                    >
                      <div
                        className={`flex items-center gap-3 ${
                          isRight ? '' : 'md:flex-row-reverse'
                        }`}
                      >
                        <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface">
                          <Icon size={18} />
                        </span>
                        <span className="font-display text-sm font-semibold text-foreground-muted">
                          {step.n}
                        </span>
                      </div>
                      <h3 className="mt-4 font-display text-xl font-semibold tracking-tight md:text-2xl">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-foreground-muted md:text-base">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
