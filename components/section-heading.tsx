'use client';

import { type ReactNode } from 'react';
import { Reveal, SmokeText } from '@/components/reveal';
import { cn } from '@/lib/utils';

export function SectionTag({ children }: { children: ReactNode }) {
  return (
    <Reveal>
      <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-foreground-muted sm:text-xs">
        <span className="h-1.5 w-1.5 rounded-full bg-lime" />
        {children}
      </div>
    </Reveal>
  );
}

interface SectionHeadingProps {
  tag?: string;
  title: string;
  titleId?: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  tag,
  title,
  titleId,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex min-w-0 flex-col gap-4 sm:gap-5',
        align === 'center' && 'items-center text-center',
        className
      )}
    >
      {tag && <SectionTag>{tag}</SectionTag>}
      <SmokeText
        as="h2"
        id={titleId}
        text={title}
        className={cn(
          'text-balance font-display text-[1.75rem] font-semibold leading-[1.12] tracking-tightest sm:text-4xl lg:text-[2.9rem]',
          align === 'center' && 'max-w-3xl'
        )}
      />
      {description && (
        <SmokeText
          as="p"
          text={description}
          delay={0.15}
          stagger={18}
          className={cn(
            'max-w-2xl text-base leading-relaxed text-foreground-muted sm:text-lg',
            align === 'center' && 'mx-auto'
          )}
        />
      )}
    </div>
  );
}
