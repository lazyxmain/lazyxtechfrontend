'use client';

import { useRef, type ReactNode, type MouseEvent } from 'react';
import { cn } from '@/lib/utils';

interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  href?: string;
  onClick?: () => void;
}

/**
 * Subtle magnetic hover for buttons. Plain DOM transform (no animation
 * library, no spring loop) and disabled on touch devices.
 */
export function Magnetic({
  children,
  className,
  strength = 0.35,
  href,
  onClick,
}: MagneticProps) {
  const ref = useRef<HTMLElement>(null);

  const handleMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * strength;
    const y = (e.clientY - r.top - r.height / 2) * strength;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  const shared = {
    onMouseMove: handleMove,
    onMouseLeave: reset,
    className: cn(
      'inline-block transition-transform duration-300 ease-out will-change-transform',
      className
    ),
  };

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        {...shared}
      >
        {children}
      </a>
    );
  }
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} onClick={onClick} {...shared}>
      {children}
    </div>
  );
}
