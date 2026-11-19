'use client';

import { Compass, TrendingUp, Zap, MessagesSquare } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { Reveal } from '@/components/reveal';

const items = [
  {
    icon: Compass,
    title: 'Strategy First',
    desc: 'We understand the business before building. Every decision is grounded in your goals, users and market.',
  },
  {
    icon: TrendingUp,
    title: 'Built to Scale',
    desc: 'Solutions designed with future growth in mind: architecture and UX that hold up as you expand.',
  },
  {
    icon: Zap,
    title: 'Performance Focused',
    desc: 'Fast, responsive and optimized experiences. Speed is a feature, and we treat it like one.',
  },
  {
    icon: MessagesSquare,
    title: 'Clear Communication',
    desc: 'Transparent collaboration throughout the project. You always know what is happening and why.',
  },
];

export function WhyUs() {
  return (
    <section
      id="why-us"
      aria-labelledby="why-title"
      className="relative py-16 sm:py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <SectionHeading
          tag="Why LazyXTech"
          titleId="why-title"
          title="More Than Development. A Technology Partner."
          className="max-w-4xl"
        />

        <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={i * 0.08} y={28} className="h-full">
                <div className="group relative flex h-full flex-col bg-surface p-6 transition-colors duration-500 hover:bg-bg sm:p-7 md:p-9">
                  <div className="relative w-fit">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-bg transition-colors duration-500 group-hover:bg-lime">
                      <Icon
                        size={22}
                        className="text-foreground transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <span className="absolute -right-3 -top-1 font-display text-[10px] font-semibold text-foreground-muted">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-lg font-semibold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                    {item.desc}
                  </p>
                  <div className="mt-6 h-px w-full origin-left scale-x-0 bg-foreground transition-transform duration-700 group-hover:scale-x-100" />
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
