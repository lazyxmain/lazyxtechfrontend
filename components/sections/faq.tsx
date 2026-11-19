import { SectionHeading } from '@/components/section-heading';
import { Reveal } from '@/components/reveal';
import { FAQS } from '@/lib/site';
import { Plus } from 'lucide-react';

/** Native <details> accordion: zero JS, fully crawlable, matches FAQPage schema. */
export function FAQ() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative py-16 sm:py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading
            tag="FAQ"
            titleId="faq-title"
            title="Questions We Get Asked Often."
            description="Everything you need to know before starting a project with LazyXTech."
          />

          <div className="min-w-0 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface">
            {FAQS.map((f, i) => (
              <Reveal key={f.q} delay={(i % 3) * 0.05} y={16}>
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left font-display text-base font-semibold tracking-tight transition-colors hover:bg-bg sm:px-7 sm:py-5 sm:text-lg [&::-webkit-details-marker]:hidden">
                    <span className="min-w-0">{f.q}</span>
                    <Plus
                      size={20}
                      className="shrink-0 text-foreground-muted transition-transform duration-300 group-open:rotate-45"
                    />
                  </summary>
                  <p className="px-5 pb-5 text-sm leading-relaxed text-foreground-muted sm:px-7 sm:pb-6 sm:text-base">
                    {f.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
