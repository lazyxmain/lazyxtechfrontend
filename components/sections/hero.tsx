'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight, Globe } from 'lucide-react';
import { Magnetic } from '@/components/magnetic';
import { HeroVisual } from '@/components/hero-visual';

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scaleScene = useTransform(scrollYProgress, [0, 1], [1, 0.85]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen w-full overflow-hidden pt-28 md:pt-32"
    >
      {/* ambient background glows */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-20 h-[520px] w-[520px] rounded-full bg-accent-fade blur-3xl" />
        <div className="absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-gradient-radial from-foreground/[0.04] to-transparent blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-8 px-5 pb-16 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-4">
        {/* Left — copy */}
        <motion.div style={{ y: yText, opacity }} className="relative z-10">
          {/* availability pill */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/60 px-4 py-2 text-xs font-medium backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75"
                style={{ animationDuration: '2s' }}
              />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
            </span>
            Available for Global Projects
          </motion.div>

          {/* headline */}
          <h1 className="mt-6 font-display text-[2.6rem] font-semibold leading-[1.04] tracking-ultra sm:text-6xl lg:text-[4.2rem]">
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ delay: 1.25, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                We Build
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ delay: 1.34, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                Digital Products
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ delay: 1.43, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                That Move{' '}
                <span className="relative inline-block">
                  <span className="relative z-10">Businesses</span>
                  <motion.span
                    className="absolute bottom-1 left-0 h-3 w-full bg-lime"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 2.2, duration: 0.6, ease: 'easeOut' }}
                    style={{ originX: 0 }}
                  />
                </span>
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ delay: 1.52, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                Forward.
              </motion.span>
            </span>
          </h1>

          {/* description */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.7 }}
            className="mt-7 max-w-xl text-base leading-relaxed text-foreground-muted sm:text-lg"
          >
            From high-performance websites and custom web applications to
            scalable software and e-commerce platforms, we help ambitious
            businesses turn ideas into powerful digital experiences.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.95, duration: 0.7 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Magnetic href="#contact" strength={0.4}>
              <span className="group flex items-center gap-2 rounded-xl bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition-colors hover:bg-lime hover:text-lime-fg">
                Start a Project
                <ArrowUpRight
                  size={18}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </Magnetic>
            <Magnetic href="#work" strength={0.3}>
              <span className="group flex items-center gap-2 rounded-xl border border-border bg-surface/40 px-7 py-3.5 text-sm font-semibold backdrop-blur-md transition-colors hover:border-foreground/30">
                Explore Our Work
                <ArrowUpRight
                  size={18}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </Magnetic>
          </motion.div>

          {/* trust row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.7 }}
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs text-foreground-muted"
          >
            <div className="flex items-center gap-2">
              <Globe size={14} className="text-lime" />
              USA · UK · Canada · Australia · Europe · India
            </div>
          </motion.div>
        </motion.div>

        {/* Right — animated visual */}
        <motion.div
          style={{ scale: scaleScene }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="relative h-[360px] w-full sm:h-[480px] lg:h-[560px]"
        >
          <HeroVisual />
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        style={{ opacity }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-foreground-muted">
          Scroll
        </span>
        <div className="h-10 w-px overflow-hidden bg-border">
          <motion.div
            className="h-3 w-px bg-foreground"
            animate={{ y: [-12, 40] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  );
}
