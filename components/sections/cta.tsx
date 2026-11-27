import { ArrowUpRight, Phone } from 'lucide-react';
import { COMPANY } from '@/lib/site';
import { Magnetic } from '@/components/magnetic';
import { Reveal, SmokeText } from '@/components/reveal';

export function CTASection() {
  return (
    <section id="start" aria-labelledby="cta-title" className="relative py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-foreground px-5 py-12 text-background sm:px-8 sm:py-16 md:px-16 md:py-24">
          {/* animated background elements */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-lime/20 blur-3xl sm:h-72 sm:w-72" />
            <div className="absolute -right-10 bottom-0 h-64 w-64 rounded-full bg-lime/10 blur-3xl sm:h-80 sm:w-80" />
            {/* grid lines */}
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
                backgroundSize: '60px 60px',
              }}
            />
          </div>

          <div className="relative flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-background/20 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-background/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                  Free Consultation
                </span>
              </Reveal>
              <SmokeText
                as="h2"
                id="cta-title"
                text="Have a Project in Mind? Let's Talk."
                className="text-balance mt-6 font-display text-[1.75rem] font-semibold leading-[1.1] tracking-tightest sm:text-5xl lg:text-[3.4rem]"
              />
              <Reveal delay={0.2}>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-background/60 sm:text-lg">
                  Tell us what you need, whether it is a website, a Shopify store or a mobile app. We will reply within one business day with questions or a clear proposal.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.3} className="flex w-full flex-shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
              <Magnetic href="#contact" strength={0.4} className="w-full sm:w-auto">
                <span className="group flex w-full items-center justify-center gap-2 rounded-xl bg-lime px-7 py-3.5 text-sm font-semibold text-lime-fg transition-transform">
                  Get a Free Quote
                  <ArrowUpRight
                    size={18}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </Magnetic>
              <Magnetic href={`tel:${COMPANY.phone}`} strength={0.3} className="w-full sm:w-auto">
                <span className="group flex w-full items-center justify-center gap-2 rounded-xl border border-background/25 px-7 py-3.5 text-sm font-semibold text-background transition-colors hover:border-background/50">
                  <Phone size={18} aria-hidden="true" />
                  Call {COMPANY.phoneDisplay}
                </span>
              </Magnetic>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
