'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Calendar } from 'lucide-react';
import { Magnetic } from '@/components/magnetic';
import { Reveal, SplitReveal } from '@/components/reveal';

export function CTASection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-foreground px-6 py-16 text-background md:px-16 md:py-24">
          {/* animated background elements */}
          <div className="pointer-events-none absolute inset-0">
            <motion.div
              className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-lime/20 blur-3xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute -right-10 bottom-0 h-80 w-80 rounded-full bg-lime/10 blur-3xl"
              animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />
            {/* grid lines */}
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
                backgroundSize: '60px 60px',
              }}
            />
          </div>

          <div className="relative flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-background/20 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-background/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                  Let&apos;s Build
                </span>
              </Reveal>
              <SplitReveal
                text="Have an Idea? Let's Make It Real."
                className="mt-6 font-display text-3xl font-semibold leading-[1.08] tracking-tightest sm:text-5xl lg:text-[3.4rem]"
              />
              <Reveal delay={0.2}>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-background/60 sm:text-lg">
                  Tell us what you&apos;re building. Let&apos;s explore how we can
                  turn your vision into a powerful digital product.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.3} className="flex flex-shrink-0 flex-wrap gap-3">
              <Magnetic href="#contact" strength={0.4}>
                <span className="group flex items-center gap-2 rounded-xl bg-lime px-7 py-3.5 text-sm font-semibold text-lime-fg transition-transform">
                  Start Your Project
                  <ArrowUpRight
                    size={18}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </Magnetic>
              <Magnetic href="#contact" strength={0.3}>
                <span className="group flex items-center gap-2 rounded-xl border border-background/25 px-7 py-3.5 text-sm font-semibold text-background transition-colors hover:border-background/50">
                  <Calendar size={18} />
                  Schedule a Call
                </span>
              </Magnetic>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
