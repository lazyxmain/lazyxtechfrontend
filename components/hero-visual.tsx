'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * Lightweight, dependency-free animated hero visual.
 * Mouse-responsive parallax with floating glass panels,
 * an animated core orb, orbiting rings, and particles.
 * No Three.js — avoids React version conflicts entirely.
 */
export function HeroVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });

  useEffect(() => {
    setMounted(true);
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mx.set((e.clientX - cx) / rect.width);
      my.set((e.clientY - cy) / rect.height);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [mx, my]);

  // parallax layers
  const coreX = useTransform(sx, [-0.6, 0.6], [-30, 30]);
  const coreY = useTransform(sy, [-0.6, 0.6], [-30, 30]);
  const ringX = useTransform(sx, [-0.6, 0.6], [-50, 50]);
  const ringY = useTransform(sy, [-0.6, 0.6], [-50, 50]);
  const panel1X = useTransform(sx, [-0.6, 0.6], [40, -40]);
  const panel1Y = useTransform(sy, [-0.6, 0.6], [30, -30]);
  const panel2X = useTransform(sx, [-0.6, 0.6], [-35, 35]);
  const panel2Y = useTransform(sy, [-0.6, 0.6], [-25, 25]);
  const particleX = useTransform(sx, [-0.6, 0.6], [-20, 20]);
  const particleY = useTransform(sy, [-0.6, 0.6], [-20, 20]);

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full"
      style={{ perspective: 1000 }}
    >
      {/* ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-fade blur-3xl" />

      {/* orbiting rings */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          className="h-[280px] w-[280px] rounded-full border border-foreground/10 sm:h-[340px] sm:w-[340px]"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        >
          <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-lime shadow-[0_0_12px_rgba(197,243,107,0.8)]" />
        </motion.div>
      </motion.div>

      <motion.div
        style={{ x: ringX, y: ringY }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          className="h-[360px] w-[360px] rounded-full border border-foreground/[0.06] sm:h-[420px] sm:w-[420px]"
          animate={{ rotate: -360 }}
          transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
        >
          <span className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-foreground/30" />
          <span className="absolute bottom-6 right-10 h-1 w-1 rounded-full bg-lime/60" />
        </motion.div>
      </motion.div>

      {/* core orb */}
      <motion.div
        style={{ x: coreX, y: coreY }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          className="relative flex h-32 w-32 items-center justify-center sm:h-40 sm:w-40"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* glow */}
          <div className="absolute inset-0 rounded-full bg-lime/25 blur-2xl" />
          {/* sphere */}
          <div className="relative h-full w-full overflow-hidden rounded-full bg-gradient-to-br from-lime via-lime/80 to-lime/40">
            {/* sheen */}
            <div className="absolute left-3 top-3 h-1/3 w-1/3 rounded-full bg-white/40 blur-md" />
            {/* grid texture */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(0,0,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.3) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />
          </div>
          {/* inner pulse */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-lime/50"
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
          />
        </motion.div>
      </motion.div>

      {/* floating glass panel 1 — top right */}
      <motion.div
        style={{ x: panel1X, y: panel1Y }}
        className="absolute right-[8%] top-[14%] hidden sm:block"
      >
        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="glass rounded-2xl px-4 py-3 shadow-lg"
        >
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-lime" />
            <span className="text-xs font-semibold">React · Next.js</span>
          </div>
          <div className="mt-2 flex gap-1.5">
            <div className="h-1 w-8 rounded-full bg-foreground/15" />
            <div className="h-1 w-12 rounded-full bg-foreground/10" />
          </div>
          <div className="mt-1.5 h-1.5 w-16 rounded-full bg-lime/70" />
        </motion.div>
      </motion.div>

      {/* floating glass panel 2 — bottom left */}
      <motion.div
        style={{ x: panel2X, y: panel2Y }}
        className="absolute bottom-[16%] left-[6%] hidden sm:block"
      >
        <motion.div
          animate={{ y: [0, 16, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="glass rounded-2xl px-4 py-3 shadow-lg"
        >
          <div className="flex items-center justify-between gap-3">
            <span className="text-[10px] font-medium uppercase tracking-wider text-foreground-muted">
              Render
            </span>
            <span className="text-xs font-bold text-foreground">60fps</span>
          </div>
          <div className="mt-2 flex items-end gap-1" style={{ height: 24 }}>
            {[0.4, 0.7, 0.5, 0.9, 0.6].map((h, i) => (
              <motion.div
                key={i}
                className="w-1.5 rounded-t-sm bg-lime"
                animate={{ height: [`${h * 50}%`, `${h * 100}%`, `${h * 50}%`] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* small floating chip — bottom right */}
      <motion.div
        style={{ x: panel1X, y: panel2Y }}
        className="absolute bottom-[24%] right-[14%] hidden md:block"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="glass flex items-center gap-2 rounded-full px-3 py-1.5 shadow-md"
        >
          <span className="flex h-1.5 w-1.5 rounded-full bg-foreground" />
          <span className="text-[10px] font-medium">TypeScript</span>
        </motion.div>
      </motion.div>

      {/* particles */}
      <motion.div
        style={{ x: particleX, y: particleY }}
        className="absolute inset-0"
      >
        {mounted &&
          [...Array(14)].map((_, i) => {
            const left = (i * 37) % 90 + 5;
            const top = (i * 53) % 85 + 5;
            const size = (i % 3) + 2;
            const delay = (i * 0.4) % 4;
            const dur = 4 + (i % 3);
            return (
              <motion.span
                key={i}
                className="absolute rounded-full bg-foreground/20"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  width: size,
                  height: size,
                }}
                animate={{ y: [0, -24, 0], opacity: [0.15, 0.5, 0.15] }}
                transition={{
                  duration: dur,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay,
                }}
              />
            );
          })}
      </motion.div>
    </div>
  );
}
