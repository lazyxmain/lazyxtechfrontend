'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { SectionTag } from '@/components/section-heading';
import { Reveal, SplitReveal } from '@/components/reveal';

export function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const yShape = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 24]);

  return (
    <section id="about" ref={ref} className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left — visual */}
          <div className="relative order-2 lg:order-1">
            <motion.div
              style={{ y: yShape, rotate }}
              className="relative mx-auto aspect-square w-full max-w-md"
            >
              {/* abstract concentric composition */}
              <div className="absolute inset-0 rounded-3xl border border-border bg-surface" />
              <div className="absolute inset-8 rounded-2xl border border-border bg-bg" />
              <motion.div
                className="absolute inset-16 rounded-full bg-lime/20"
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute inset-24 rounded-full border-2 border-foreground/15"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="font-display text-[8rem] font-bold leading-none tracking-tighter text-foreground/10"
                  animate={{ opacity: [0.06, 0.12, 0.06] }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  L
                </motion.div>
              </div>
              {/* floating stat chips */}
              <motion.div
                className="absolute -left-4 top-12 rounded-xl border border-border bg-surface px-4 py-3 shadow-sm"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="text-xs text-foreground-muted">Approach</div>
                <div className="font-display text-sm font-semibold">Design + Engineering</div>
              </motion.div>
              <motion.div
                className="absolute -right-4 bottom-16 rounded-xl border border-border bg-surface px-4 py-3 shadow-sm"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                <div className="text-xs text-foreground-muted">Reach</div>
                <div className="font-display text-sm font-semibold">Global Clients</div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right — copy */}
          <div className="order-1 lg:order-2">
            <SectionTag>About</SectionTag>
            <SplitReveal
              text="Small Team. Big Digital Ambitions."
              className="mt-5 font-display text-3xl font-semibold leading-[1.1] tracking-tightest sm:text-4xl lg:text-[2.8rem]"
            />
            <div className="mt-7 space-y-5 text-base leading-relaxed text-foreground-muted sm:text-lg">
              <Reveal delay={0.1}>
                <p>
                  LazyXTech is a technology-focused digital agency built around
                  one simple idea: great technology should solve real business
                  problems.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p>
                  We partner with businesses and founders to design, develop and
                  deliver digital products that are reliable, scalable and built
                  for growth.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <p>
                  Our approach combines thoughtful design, modern engineering and
                  transparent collaboration.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.4}>
              <div className="mt-10 flex flex-wrap gap-8">
                <Stat value="6" label="Target Markets" />
                <Stat value="4" label="Core Capabilities" />
                <Stat value="∞" label="Iteration Cycles" />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref}>
      <motion.div
        className="font-display text-3xl font-semibold tracking-tight md:text-4xl"
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        {value}
      </motion.div>
      <div className="mt-1 text-sm text-foreground-muted">{label}</div>
    </div>
  );
}
