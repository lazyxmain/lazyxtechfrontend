import {
  MapPin,
  ShieldCheck,
  FileText,
  SearchCheck,
  Gauge,
  MessagesSquare,
} from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { Reveal } from '@/components/reveal';

const items = [
  {
    icon: MapPin,
    title: 'Based in Bhopal',
    desc: 'A real team in Madhya Pradesh you can reach by phone, WhatsApp or email, not a faceless agency. We work with clients across India and abroad.',
  },
  {
    icon: ShieldCheck,
    title: '6 Months of Support',
    desc: 'We do not disappear after launch. Every project includes 6 months of post-launch support for fixes, updates and small changes.',
  },
  {
    icon: FileText,
    title: 'Clear Scope and Timeline',
    desc: 'You get a written proposal with scope, timeline and cost before work begins, so there are no surprises later.',
  },
  {
    icon: SearchCheck,
    title: 'SEO-Ready by Default',
    desc: 'Clean structure, proper meta tags, sitemap and structured data are built into every website, not added as an afterthought.',
  },
  {
    icon: Gauge,
    title: 'Fast and Mobile-First',
    desc: 'Most visitors arrive on a phone. We build for speed and small screens first, using modern tools like Next.js.',
  },
  {
    icon: MessagesSquare,
    title: 'Direct Communication',
    desc: 'You talk to the people actually building your project, with regular updates and preview links as work progresses.',
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
          title="A Local Team You Can Actually Trust."
          description="No inflated claims. Just honest scope, solid engineering and support that continues after your project goes live."
          className="max-w-4xl"
        />

        <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={(i % 3) * 0.08} y={28} className="h-full">
                <div className="group relative flex h-full flex-col bg-surface p-6 transition-colors duration-500 hover:bg-bg sm:p-7 md:p-9">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-bg transition-colors duration-500 group-hover:bg-lime">
                    <Icon
                      size={22}
                      aria-hidden="true"
                      className="text-foreground transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="mt-6 font-display text-lg font-semibold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
