'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Search, Map, Code, Rocket, LifeBuoy } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { Reveal } from '@/components/reveal';

const steps = [
  {
    n: '01',
    title: 'Discover',
    desc: 'Understand your business, goals and requirements.',
    icon: Search,
  },
  {
    n: '02',
    title: 'Strategize',
    desc: 'Define the solution, scope and development roadmap.',
    icon: Map,
  },
  {
    n: '03',
    title: 'Design & Build',
    desc: 'Create and develop the digital product.',
    icon: Code,
  },
  {
    n: '04',
    title: 'Launch',
    desc: 'Test, deploy and deliver the final solution.',
    icon: Rocket,
  },
  {
    n: '05',
    title: 'Support & Scale',
    desc: 'Continue improving and supporting the product.',
    icon: LifeBuoy,
  },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.4'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <SectionHeading
          tag="Our Process"
          title="From First Conversation to Final Launch."
          className="max-w-4xl"
        />

        <div ref={ref} className="relative mt-16 pl-2 md:pl-0">
          {/* vertical track */}
          <div className="absolute left-[19px] top-2 h-full w-px bg-border md:left-1/2 md:-translate-x-1/2">
            <motion.div
              className="absolute left-0 top-0 w-full bg-foreground"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="flex flex-col gap-12 md:gap-16">
            {steps.map((step, i) => (
              <ProcessStep key={step.n} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessStep({
  step,
  index,
}: {
  step: (typeof steps)[number];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const isRight = index % 2 === 1;
  const Icon = step.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex items-start gap-6 md:grid md:grid-cols-2 md:items-center md:gap-0"
    >
      {/* node */}
      <div className="absolute left-0 top-1 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface md:left-1/2 md:-translate-x-1/2">
        <motion.div
          className="h-3 w-3 rounded-full bg-lime"
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.4 }}
        />
      </div>

      {/* content */}
      <div
        className={`ml-14 md:ml-0 ${
          isRight ? 'md:col-start-2 md:pl-16' : 'md:col-start-1 md:pr-16 md:text-right'
        }`}
      >
        <div className={`flex items-center gap-3 ${isRight ? '' : 'md:flex-row-reverse'}`}>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border">
            <Icon size={18} />
          </div>
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
    </motion.div>
  );
}
