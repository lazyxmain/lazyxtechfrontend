'use client';

import { createElement, type CSSProperties, type ReactNode } from 'react';
import { useInViewOnce } from '@/components/use-in-view';
import { cn } from '@/lib/utils';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

/** Light fade-up reveal. Pure CSS transition, triggered once on scroll. */
export function Reveal({ children, className, delay = 0, y = 24 }: RevealProps) {
  const [ref, inView] = useInViewOnce<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cn('rv', inView && 'rv-in', className)}
      style={
        {
          '--rv-y': `${y}px`,
          transitionDelay: delay ? `${delay}s` : undefined,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}

type SmokeTag = 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';

interface SmokeTextProps {
  text: string;
  as?: SmokeTag;
  id?: string;
  className?: string;
  delay?: number;
  /** ms between words */
  stagger?: number;
}

/**
 * "Smoke" text reveal: each word fades in out of a blur while drifting up,
 * like smoke clearing. CSS-only animation, runs once when scrolled into view.
 */
export function SmokeText({
  text,
  as = 'p',
  id,
  className,
  delay = 0,
  stagger = 45,
}: SmokeTextProps) {
  const [ref, inView] = useInViewOnce<HTMLElement>();
  const words = text.split(' ');

  return createElement(
    as,
    {
      ref,
      id,
      className: cn('smoke', inView && 'smoke-in', className),
      style: { '--smoke-delay': `${delay}s`, '--smoke-step': `${stagger}ms` },
    },
    words.map((word, i) => (
      <span key={i}>
        <span className="smoke-word" style={{ '--i': i } as CSSProperties}>
          {word}
        </span>
        {i < words.length - 1 ? ' ' : ''}
      </span>
    ))
  );
}

/** Backwards-compatible headline reveal (now the smoke effect). */
export function SplitReveal({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}) {
  return <SmokeText as="h2" text={text} className={className} delay={delay} />;
}
