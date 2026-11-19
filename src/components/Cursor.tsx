import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 550, damping: 42, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 550, damping: 42, mass: 0.4 });
  const [variant, setVariant] = useState<'default' | 'hover' | 'view' | 'text'>('default');
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setEnabled(true);
    document.documentElement.classList.add('cursor-zone');

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const t = e.target as HTMLElement;
      const hit = t.closest('a, button, [role="button"], input, select, textarea, label');
      const view = t.closest('[data-cursor="view"]');
      const text = t.closest('h1, h2, h3, p, span');
      if (view) setVariant('view');
      else if (hit) setVariant('hover');
      else if (text) setVariant('text');
      else setVariant('default');
    };
    const leave = () => setVisible(false);
    window.addEventListener('mousemove', move, { passive: true });
    document.documentElement.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      document.documentElement.removeEventListener('mouseleave', leave);
      document.documentElement.classList.remove('cursor-zone');
    };
  }, [x, y]);

  if (!enabled) return null;

  const size = variant === 'view' ? 84 : variant === 'hover' ? 52 : variant === 'text' ? 20 : 14;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[120] hidden md:flex items-center justify-center"
      style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%', opacity: visible ? 1 : 0 }}
    >
      <motion.div
        className="flex items-center justify-center rounded-full border"
        animate={{
          width: size,
          height: size,
          backgroundColor:
            variant === 'view'
              ? 'rgba(197, 243, 107, 0.95)'
              : variant === 'hover'
                ? 'rgba(197, 243, 107, 0.12)'
                : 'rgba(197, 243, 107, 0.9)',
          borderColor: variant === 'hover' ? 'rgba(197, 243, 107, 0.5)' : 'rgba(197, 243, 107, 0)',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        {variant === 'view' && (
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-ink">View</span>
        )}
        {variant === 'text' && <span className="h-[9px] w-[1.5px] rounded-full bg-chalk/40" />}
      </motion.div>
    </motion.div>
  );
}
