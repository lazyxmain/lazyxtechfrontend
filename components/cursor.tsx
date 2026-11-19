'use client';

import { useEffect, useRef, useState } from 'react';

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [variant, setVariant] = useState<'default' | 'hover' | 'view'>(
    'default'
  );
  const [hidden, setHidden] = useState(true);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isTouch =
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch) return;
    setEnabled(true);

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      setHidden(false);

      const target = e.target as HTMLElement;
      if (target.closest('[data-cursor="view"]')) {
        setVariant('view');
      } else if (
        target.closest('a, button, [role="button"], input, textarea, select, label, [data-cursor="hover"]')
      ) {
        setVariant('hover');
      } else {
        setVariant('default');
      }
    };

    const onLeave = () => setHidden(true);

    const loop = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  const ringSize =
    variant === 'view' ? 84 : variant === 'hover' ? 52 : 36;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] hidden md:block"
      style={{ opacity: hidden ? 0 : 1, transition: 'opacity 0.3s' }}
      aria-hidden="true"
    >
      <div
        ref={dotRef}
        className="fixed left-0 top-0 rounded-full bg-foreground mix-blend-difference"
        style={{
          width: 6,
          height: 6,
          transition: 'width 0.2s, height 0.2s',
        }}
      />
      <div
        ref={ringRef}
        className="fixed left-0 top-0 rounded-full border border-foreground/40"
        style={{
          width: ringSize,
          height: ringSize,
          transition:
            'width 0.25s cubic-bezier(0.22,1,0.36,1), height 0.25s cubic-bezier(0.22,1,0.36,1), background-color 0.2s, border-color 0.2s',
          backgroundColor:
            variant === 'view' ? 'hsl(var(--accent))' : 'transparent',
          borderColor:
            variant === 'view' ? 'transparent' : 'hsl(var(--foreground) / 0.35)',
        }}
      >
        {variant === 'view' && (
          <span className="flex h-full w-full items-center justify-center text-[10px] font-semibold uppercase tracking-widest text-foreground">
            View
          </span>
        )}
      </div>
    </div>
  );
}
