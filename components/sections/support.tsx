import { Bug, ShieldCheck, PencilLine, Gauge, PhoneCall, ArrowUpRight } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { Reveal } from '@/components/reveal';
import { Magnetic } from '@/components/magnetic';

const included = [
  { icon: Bug, title: 'Bug fixes', desc: 'If something does not work as agreed, we fix it.' },
  { icon: ShieldCheck, title: 'Security and compatibility updates', desc: 'Keeping your site or app working as browsers, plugins and devices change.' },
  { icon: PencilLine, title: 'Small content and design changes', desc: 'Text, images and minor layout tweaks when you need them.' },
  { icon: Gauge, title: 'Performance check-ups', desc: 'We look at speed and basic SEO health and suggest improvements.' },
  { icon: PhoneCall, title: 'Direct help', desc: 'Reach us on phone, WhatsApp or email whenever you get stuck.' },
];

export function Support() {
  return (
    <section
      id="support"
      aria-labelledby="support-title"
      className="relative py-16 sm:py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-6 sm:p-10 md:p-14">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-lime/25 blur-3xl" />

          <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div className="min-w-0">
              <SectionHeading
                tag="After Launch"
                titleId="support-title"
                title="6 Months of Support After Your Project Goes Live."
                description="Launch day is not the finish line. For six months after delivery, we stay available so your website, store or app keeps running smoothly."
              />
              <Reveal delay={0.1} className="mt-8">
                <Magnetic href="/#contact" strength={0.3}>
                  <span className="group inline-flex items-center gap-2 rounded-xl bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition-colors hover:bg-lime hover:text-lime-fg">
                    Start Your Project
                    <ArrowUpRight
                      size={16}
                      aria-hidden="true"
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </Magnetic>
              </Reveal>
            </div>

            <ul className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2">
              {included.map((item, i) => {
                const Icon = item.icon;
                return (
                  <li key={item.title} className={i === included.length - 1 ? 'sm:col-span-2' : ''}>
                    <Reveal delay={(i % 2) * 0.07} y={20} className="h-full">
                      <div className="flex h-full gap-4 rounded-2xl border border-border bg-bg p-5">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface">
                          <Icon size={18} aria-hidden="true" />
                        </span>
                        <div className="min-w-0">
                          <h3 className="font-display text-base font-semibold tracking-tight">
                            {item.title}
                          </h3>
                          <p className="mt-1 text-sm leading-relaxed text-foreground-muted">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </Reveal>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
