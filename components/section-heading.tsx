'use client';

import { type ReactNode } from 'react';
import { Reveal, SplitReveal } from '@/components/reveal';
import { cn } from '@/lib/utils';

export function SectionTag({ children }: { children: ReactNode }) {
  return (
    <Reveal>
      <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-foreground-muted backdrop-blur-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-lime" />
        {children}
      </div>
    </Reveal>
  );
}

interface SectionHeadingProps {
  tag?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  tag,
  title,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-5',
        align === 'center' && 'items-center text-center',
        className
      )}
    >
      {tag && <SectionTag>{tag}</SectionTag>}
      <SplitReveal
        text={title}
        className={cn(
          'font-display text-3xl font-semibold leading-[1.08] tracking-tightest sm:text-4xl lg:text-[2.9rem]',
          align === 'center' && 'max-w-3xl'
        )}
      />
      {description && (
        <Reveal delay={0.15}>
          <p
            className={cn(
              'max-w-2xl text-base leading-relaxed text-foreground-muted sm:text-lg',
              align === 'center' && 'mx-auto'
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
