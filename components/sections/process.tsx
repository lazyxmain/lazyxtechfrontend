'use client';

import { Search, Map, Code, Rocket, LifeBuoy } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { Reveal } from '@/components/reveal';

const steps = [
  { n: '01', title: 'Discuss', desc: 'A quick call or chat to understand your business, goals and what you need built.', icon: Search },
  { n: '02', title: 'Proposal', desc: 'A written scope, timeline and cost, so you know exactly what you are getting before we start.', icon: Map },
  { n: '03', title: 'Design & Build', desc: 'We design and develop in clear milestones, sharing preview links so you can give feedback early.', icon: Code },
  { n: '04', title: 'Test & Launch', desc: 'Testing on real devices, SEO and speed checks, then we take your project live.', icon: Rocket },
  { n: '05', title: '6 Months Support', desc: 'After launch we stay available for bug fixes, updates and small changes for 6 months.', icon: LifeBuoy },
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
          tag="How We Work"
          titleId="process-title"
          title="A Simple Process, From First Call to Launch and Beyond."
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
