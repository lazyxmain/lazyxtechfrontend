import { useRef, useState, type MouseEvent } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Compass, TrendingUp, Gauge, MessagesSquare } from 'lucide-react';
import { Reveal, SectionTag, RevealText, useReducedMotion } from './motion';

const STRENGTHS = [
  {
    title: 'Strategy First',
    desc: 'We understand the business before building.',
    icon: Compass,
  },
  {
    title: 'Built to Scale',
    desc: 'Solutions designed with future growth in mind.',
    icon: TrendingUp,
  },
  {
    title: 'Performance Focused',
    desc: 'Fast, responsive and optimized experiences.',
    icon: Gauge,
  },
  {
    title: 'Clear Communication',
    desc: 'Transparent collaboration throughout the project.',
    icon: MessagesSquare,
  },
];

function StrengthCard({ s, index }: { s: (typeof STRENGTHS)[number]; index: number }) {
  const Icon = s.icon;
  const [t, setT] = useState({ x: 50, y: 50, on: false });
  const reduced = useReducedMotion();

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    setT({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100, on: true });
  };

  return (
    <Reveal delay={index * 0.08}>
      <div
        onMouseMove={onMove}
        onMouseLeave={() => setT((p) => ({ ...p, on: false }))}
        className="group relative h-full overflow-hidden rounded-2xl border border-line bg-ink-soft p-7 transition-colors duration-500 hover:border-lime-electric/30"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-opacity duration-500"
          style={{
            opacity: t.on ? 1 : 0,
            background: `radial-gradient(300px circle at ${t.x}% ${t.y}%, rgba(197,243,107,0.08), transparent 70%)`,
          }}
        />
        <motion.div
          className="flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-ink-card"
          whileHover={reduced ? undefined : { rotate: [0, -8, 8, 0], transition: { duration: 0.5 } }}
        >
          <Icon size={22} className="text-lime-electric" strokeWidth={1.7} />
        </motion.div>
        <h3 className="mt-6 font-display text-lg font-semibold text-chalk">{s.title}</h3>
        <p className="mt-2.5 text-sm leading-relaxed text-chalk-dim">{s.desc}</p>
      </div>
    </Reveal>
  );
}

export default function Why() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section ref={ref} className="relative overflow-hidden py-28 md:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/4 h-[420px] w-[420px] rounded-full bg-voltage/[0.06] blur-[130px]"
      />
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <SectionTag index="02" label="Why LazyXTech" />
            <RevealText
              as="h2"
              text="Technology That Works as Hard as Your Business."
              className="mt-6 block font-display text-3xl font-semibold leading-[1.15] tracking-tight md:text-5xl"
            />
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-chalk-dim">
                Every product we ship is judged by one standard: does it move the business forward?
                That lens shapes strategy, engineering and every release after launch.
              </p>
            </Reveal>

            {/* Parallax decorative structure */}
            <motion.div style={{ y: y1 }} aria-hidden="true" className="mt-12 hidden lg:block">
              <div className="relative h-44 w-44">
                <div className="absolute inset-0 rounded-2xl border border-lime-electric/25 bg-lime-electric/[0.03]" />
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-xl border border-voltage/25 bg-voltage/[0.04]" />
                <div className="absolute -bottom-5 -left-5 h-16 w-16 rounded-lg border border-line bg-ink-card" />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-chalk-dim">
                  est. craft
                </span>
              </div>
            </motion.div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {STRENGTHS.map((s, i) => (
              <StrengthCard key={s.title} s={s} index={i} />
            ))}
          </div>
        </div>
      </div>
      <motion.div style={{ y: y2 }} aria-hidden="true" className="pointer-events-none absolute right-[6%] top-[10%] hidden lg:block">
        <div className="h-28 w-28 animate-spin-slow rounded-full border border-dashed border-white/15" />
      </motion.div>
    </section>
  );
}
