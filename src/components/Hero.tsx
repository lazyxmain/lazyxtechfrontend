import { lazy, Suspense } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { PrimaryButton, GhostButton } from './Buttons';
import { Magnetic } from './motion';
import { scrollToId } from './ScrollProvider';

const ParticleWave = lazy(() => import('./three/ParticleWave'));

const STATS = [
  { value: 'USA · UK · EU · IN', label: 'Client regions' },
  { value: '12+', label: 'Core technologies' },
  { value: '5-Stage', label: 'Delivery process' },
];

/* Slim lime scroll progress bar */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[110] h-[2px] origin-left bg-gradient-to-r from-lime-electric via-lime-electric to-voltage"
      style={{ scaleX: width }}
    />
  );
}

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* Ambient background glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-electric/[0.07] blur-[140px]" />
        <div className="absolute right-[8%] top-[15%] h-[380px] w-[380px] rounded-full bg-voltage/[0.09] blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
            maskImage: 'radial-gradient(ellipse 75% 65% at 50% 40%, black 30%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse 75% 65% at 50% 40%, black 30%, transparent 75%)',
          }}
        />
      </div>

      {/* 3D particle ocean behind content */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[52%] opacity-70">
        <Suspense fallback={null}>
          <ParticleWave />
        </Suspense>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 pt-36 md:px-10 lg:pt-40">
        <div className="max-w-3xl">
          {/* Availability pill */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.7 }}
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-line bg-ink-card/70 px-4 py-2 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute h-full w-full animate-pulse-ring rounded-full bg-lime-electric" />
              <span className="h-2 w-2 rounded-full bg-lime-electric" />
            </span>
            <span className="text-xs font-medium tracking-wide text-chalk">
              Available for Global Projects
            </span>
          </motion.div>

          {/* Smoke-style headline reveal */}
          <motion.h1
            className="font-display text-[clamp(2.4rem,6.2vw,4.9rem)] font-semibold leading-[1.06] tracking-tight text-balance"
            initial={{ opacity: 0, y: 30, filter: 'blur(18px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 1.75, duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          >
            We Build Digital Products{' '}
            <span className="bg-gradient-to-r from-lime-electric to-[#e6ffb0] bg-clip-text text-transparent">
              That Move
            </span>{' '}
            Businesses Forward.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 2.05, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 max-w-xl text-base leading-relaxed text-chalk-dim md:text-lg"
          >
            From high-performance websites and custom web applications to scalable software and
            e-commerce platforms, we help ambitious businesses turn ideas into powerful digital
            experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <PrimaryButton onClick={() => scrollToId('contact')}>
              Start a Project <ArrowUpRight size={16} />
            </PrimaryButton>
            <GhostButton onClick={() => scrollToId('work')}>
              Explore Our Work <ArrowDown size={15} />
            </GhostButton>
          </motion.div>

          {/* Stats row */}
          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.45, duration: 1 }}
            className="mt-16 grid max-w-xl grid-cols-3 gap-6 border-t border-line pt-7"
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-sm font-semibold text-chalk md:text-base">{s.value}</dd>
                <dd className="mt-1 text-[11px] uppercase tracking-[0.18em] text-chalk-dim">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.button
        onClick={() => scrollToId('services')}
        aria-label="Scroll to services"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-chalk-dim transition-colors hover:text-lime-electric"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8 }}
      >
        <Magnetic>
          <motion.span
            className="block"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            <ArrowDown size={20} />
          </motion.span>
        </Magnetic>
      </motion.button>

      <ScrollProgress />
    </section>
  );
}
