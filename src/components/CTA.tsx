import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CalendarClock } from 'lucide-react';
import { PrimaryButton, GhostButton } from './Buttons';
import { Reveal } from './motion';
import { scrollToId } from './ScrollProvider';

const CtaScene = lazy(() => import('./three/CtaScene'));

export default function CTA() {
  return (
    <section className="relative overflow-hidden py-32 md:py-44">
      {/* 3D centerpiece */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <Suspense fallback={null}>
          <CtaScene />
        </Suspense>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,transparent_30%,var(--c-bg)_100%)]"
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <p className="eyebrow mb-6">Ready when you are</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
            Your Next Big{' '}
            <span className="bg-gradient-to-r from-lime-electric to-voltage bg-clip-text text-transparent">
              Idea
            </span>{' '}
            Starts Here.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-chalk-dim md:text-lg">
            Tell us what you&apos;re building. Let&apos;s explore how we can turn your vision into
            a powerful digital product.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <PrimaryButton onClick={() => scrollToId('contact')}>
              Start Your Project <ArrowUpRight size={16} />
            </PrimaryButton>
            <GhostButton onClick={() => scrollToId('contact')}>
              Schedule a Call <CalendarClock size={15} />
            </GhostButton>
          </div>
        </Reveal>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-8 font-mono text-[11px] uppercase tracking-[0.28em] text-chalk-dim"
        >
          Your Ideas. Our Technology. Built for What&apos;s Next.
        </motion.p>
      </div>
    </section>
  );
}
