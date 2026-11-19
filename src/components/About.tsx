import { useRef, useState, type MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Reveal, SectionTag, RevealText } from './motion';
import { scrollToId } from './ScrollProvider';

/* Rotating wireframe globe-ish structure for the About visual */
function OrbitalVisual() {
  const [t, setT] = useState({ x: 50, y: 50, on: false });
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    setT({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
      on: true,
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setT((p) => ({ ...p, on: false }))}
      className="relative flex min-h-[380px] items-center justify-center overflow-hidden rounded-3xl border border-line bg-ink-card lg:min-h-[560px]"
      aria-hidden="true"
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: t.on ? 1 : 0,
          background: `radial-gradient(400px circle at ${t.x}% ${t.y}%, rgba(197,243,107,0.09), transparent 65%)`,
        }}
      />
      <div className="relative h-64 w-64 md:h-80 md:w-80">
        <motion.div
          className="absolute inset-0 rounded-full border border-lime-electric/30"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 28, ease: 'linear' }}
          style={{ borderStyle: 'dashed' }}
        />
        <motion.div
          className="absolute inset-4 rounded-full border border-voltage/30"
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
          style={{ borderStyle: 'dashed' }}
        />
        <motion.div
          className="absolute inset-10 rounded-2xl border border-white/15 bg-ink-soft/80"
          animate={{ y: [0, -8, 0], rotate: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 9, ease: 'easeInOut' }}
        >
          <div className="flex h-full w-full items-center justify-center">
            <svg width="52" height="52" viewBox="0 0 15 15" fill="none">
              <path d="M3 2v8.5h7.5" stroke="#C5F36B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="11" cy="4" r="1.8" fill="#718CFF" />
            </svg>
          </div>
        </motion.div>
        {[
          { cls: 'left-0 top-8 h-2 w-2 bg-lime-electric', d: { y: [0, -14, 0] }, dur: 6 },
          { cls: 'right-6 top-0 h-1.5 w-1.5 bg-voltage', d: { y: [0, 12, 0] }, dur: 7 },
          { cls: 'bottom-6 right-10 h-2 w-2 bg-white/40', d: { x: [0, -16, 0] }, dur: 8 },
          { cls: 'bottom-0 left-10 h-1.5 w-1.5 bg-lime-electric/70', d: { x: [0, 14, 0] }, dur: 5.5 },
        ].map((p, i) => (
          <motion.span
            key={i}
            className={`absolute rounded-full ${p.cls}`}
            animate={p.d}
            transition={{ repeat: Infinity, duration: p.dur, ease: 'easeInOut' }}
          />
        ))}
      </div>
      <div className="absolute bottom-6 left-6 font-mono text-[10px] uppercase tracking-[0.3em] text-chalk-dim">
        Think / Build / Ship
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div className="order-2 lg:order-1">
            <OrbitalVisual />
          </div>
          <div className="order-1 lg:order-2">
            <SectionTag index="06" label="About LazyXTech" />
            <RevealText
              as="h2"
              text="We Think Beyond the Code."
              className="mt-6 block font-display text-4xl font-semibold tracking-tight md:text-5xl"
            />
            <Reveal delay={0.15}>
              <div className="mt-7 space-y-5 text-[15px] leading-relaxed text-chalk-dim md:text-base">
                <p>
                  LazyXTech is a technology-focused digital agency built around one simple idea:
                  great technology should solve real business problems.
                </p>
                <p>
                  We partner with businesses and founders to design, develop and deliver digital
                  products that are reliable, scalable and built for growth.
                </p>
                <p>
                  Our approach combines thoughtful design, modern engineering and transparent
                  collaboration.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <button
                onClick={() => scrollToId('contact')}
                className="group mt-9 inline-flex items-center gap-2 font-display text-sm font-semibold text-lime-electric"
              >
                Start a conversation
                <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
