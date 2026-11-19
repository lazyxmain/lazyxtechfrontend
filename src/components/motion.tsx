import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const fn = () => setReduced(mq.matches);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, []);
  return reduced;
}

/* Fade + rise reveal on scroll */
export function Reveal({
  children,
  delay = 0,
  y = 36,
  className = '',
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* Word-by-word masked headline reveal */
export function RevealText({
  text,
  className = '',
  delay = 0,
  as: Tag = 'span',
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: 'span' | 'h1' | 'h2' | 'h3';
}) {
  const reduced = useReducedMotion();
  const words = text.split(' ');
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.05, delayChildren: delay } },
  };
  /* Smoke-style reveal: blurred, dispersed letters condensing into sharp text */
  const word: Variants = {
    hidden: { y: '110%', rotate: 5, opacity: 0, filter: 'blur(12px)', letterSpacing: '0.12em' },
    show: {
      y: '0%',
      rotate: 0,
      opacity: 1,
      filter: 'blur(0px)',
      letterSpacing: '0em',
      transition: { duration: 1.1, ease: EASE },
    },
  };
  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }
  return (
    <Tag className={className} aria-label={text}>
      <motion.span
        className="inline"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
      >
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom">
            <motion.span className="inline-block will-change-transform" variants={word}>
              {w}
              {i < words.length - 1 ? '\u00A0' : ''}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

/* Magnetic hover wrapper */
export function Magnetic({ children, strength = 0.35, className = '' }: { children: ReactNode; strength?: number; className?: string }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMove = (e: MouseEvent) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({
      x: (e.clientX - (r.left + r.width / 2)) * strength,
      y: (e.clientY - (r.top + r.height / 2)) * strength,
    });
  };
  const onLeave = () => setPos({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 16, mass: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

/* Button that follows hover position for sheen + tilt */
export function TiltCard({ children, className = '', max = 6 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ rx: 0, ry: 0, mx: 50, my: 50 });
  const reduced = useReducedMotion();

  const onMove = (e: MouseEvent) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setT({ rx: (0.5 - py) * max, ry: (px - 0.5) * max, mx: px * 100, my: py * 100 });
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `perspective(1000px) rotateX(${t.rx}deg) rotateY(${t.ry}deg)`,
        transition: 'transform 0.25s cubic-bezier(0.22,1,0.36,1)',
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={onMove}
      onMouseLeave={() => setT({ rx: 0, ry: 0, mx: 50, my: 50 })}
    >
      {children}
    </div>
  );
}

/* Section eyebrow with index number */
export function SectionTag({ index, label }: { index: string; label: string }) {
  return (
    <Reveal>
      <div className="flex items-center gap-3">
        <span className="font-mono text-[11px] tracking-[0.25em] text-lime-electric">{index}</span>
        <span className="h-px w-10 bg-lime-electric/40" />
        <span className="eyebrow !text-chalk-dim">{label}</span>
      </div>
    </Reveal>
  );
}

export { useInView, EASE };
