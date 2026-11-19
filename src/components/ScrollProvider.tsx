import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Lenis from 'lenis';

/* Smooth scroll provider (Lenis) */
export function SmoothScroll() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    (window as any).__lenis = lenis;

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Anchor links route through Lenis for buttery section jumps
    const onClick = (e: Event) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute('href')!.slice(1);
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el, { offset: -90, duration: 1.4 });
        history.replaceState(null, '', `#${id}`);
      }
    };
    document.addEventListener('click', onClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('click', onClick);
      lenis.destroy();
      delete (window as any).__lenis;
    };
  }, [reduced]);

  return null;
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = (window as any).__lenis as Lenis | undefined;
  if (lenis) lenis.scrollTo(el, { offset: -90, duration: 1.4 });
  else el.scrollIntoView({ behavior: 'smooth' });
}

/* Cinematic page loader */
export function Loader() {
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const dur = 1400;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      setCount(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 250);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (done) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ink"
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="font-display text-2xl font-semibold tracking-tight text-chalk">
          Lazy<span className="text-lime-electric">X</span>Tech
        </span>
      </motion.div>
      <div className="mt-6 h-px w-48 overflow-hidden bg-white/10">
        <motion.div
          className="h-full bg-lime-electric"
          initial={{ width: '0%' }}
          animate={{ width: `${count}%` }}
          transition={{ ease: 'linear', duration: 0.1 }}
        />
      </div>
      <span className="mt-3 font-mono text-[11px] tracking-[0.3em] text-chalk-dim">
        {String(count).padStart(3, '0')}%
      </span>
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-ink"
        initial={false}
        animate={count >= 100 ? { y: 0 } : { y: '100%' }}
      />
    </motion.div>
  );
}
