'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
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
    desc: 'Solutions designed with future growth in mind — architecture and UX that hold up as you expand.',
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
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <SectionHeading
          tag="Why LazyXTech"
          title="More Than Development. A Technology Partner."
          className="max-w-4xl"
        />

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <WhyCard key={item.title} item={item} icon={Icon} index={i} />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WhyCard({
  item,
  icon: Icon,
  index,
}: {
  item: { title: string; desc: string };
  icon: typeof Compass;
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="group relative flex flex-col bg-surface p-7 transition-colors duration-500 hover:bg-bg md:p-9"
    >
      <div className="relative">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-bg transition-all duration-500 group-hover:bg-lime">
          <Icon
            size={22}
            className="text-foreground transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <span className="absolute -top-1 -right-1 font-display text-[10px] font-semibold text-foreground-muted">
          0{index + 1}
        </span>
      </div>

      <h3 className="mt-6 font-display text-lg font-semibold tracking-tight">
        {item.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
        {item.desc}
      </p>

      <motion.div
        className="mt-6 h-px w-0 bg-foreground"
        initial={{ width: 0 }}
        animate={inView ? { width: '100%' } : {}}
        transition={{ duration: 0.9, delay: index * 0.08 + 0.3 }}
      />
    </motion.div>
  );
}
