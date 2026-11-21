'use client';

import { SectionTag } from '@/components/section-heading';
import { Reveal, SmokeText } from '@/components/reveal';

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative py-16 sm:py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Visual */}
          <div className="relative order-2 lg:order-1">
            <Reveal y={30}>
              <figure className="relative mx-auto w-full max-w-[22rem] sm:max-w-md">
                <div className="overflow-hidden rounded-3xl border border-border bg-surface shadow-[0_30px_80px_-35px_rgba(0,0,0,0.35)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/about-poster.svg"
                    alt="LazyXTech poster: technology that solves real business problems"
                    width={800}
                    height={1000}
                    loading="lazy"
                    decoding="async"
                    className="block h-auto w-full"
                  />
                </div>
                <div
                  aria-hidden="true"
                  className="animate-float absolute left-2 top-[10%] rounded-xl border border-border bg-surface px-3 py-2.5 shadow-md sm:-left-5 sm:px-4 sm:py-3"
                >
                  <div className="text-xs text-foreground-muted">Approach</div>
                  <div className="font-display text-sm font-semibold">Design + Engineering</div>
                </div>
                <div
                  aria-hidden="true"
                  className="animate-float-slow absolute bottom-[12%] right-2 rounded-xl border border-border bg-surface px-3 py-2.5 shadow-md sm:-right-5 sm:px-4 sm:py-3"
                >
                  <div className="text-xs text-foreground-muted">Reach</div>
                  <div className="font-display text-sm font-semibold">Global Clients</div>
                </div>
                <figcaption className="sr-only">LazyXTech brand poster</figcaption>
              </figure>
            </Reveal>
          </div>

          {/* Copy */}
          <div className="order-1 min-w-0 lg:order-2">
            <SectionTag>About</SectionTag>
            <SmokeText
              as="h2"
              id="about-title"
              text="Small Team. Big Digital Ambitions."
              className="mt-5 text-balance font-display text-[1.75rem] font-semibold leading-[1.12] tracking-tightest sm:text-4xl lg:text-[2.8rem]"
            />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground-muted sm:mt-7 sm:space-y-5 sm:text-lg">
              <SmokeText
                text="LazyXTech is a technology-focused digital agency built around one simple idea: great technology should solve real business problems."
                stagger={14}
                delay={0.1}
              />
              <SmokeText
                text="We partner with businesses and founders to design, develop and deliver digital products that are reliable, scalable and built for growth."
                stagger={14}
                delay={0.2}
              />
              <SmokeText
                text="Our approach combines thoughtful design, modern engineering and transparent collaboration."
                stagger={14}
                delay={0.3}
              />
            </div>

            <Reveal delay={0.2}>
              <dl className="mt-9 grid grid-cols-3 gap-4 sm:mt-10 sm:flex sm:flex-wrap sm:gap-10">
                <Stat value="6" label="Target Markets" />
                <Stat value="4" label="Core Capabilities" />
                <Stat value="∞" label="Iteration Cycles" />
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dd className="order-2 font-display text-3xl font-semibold tracking-tight md:text-4xl">
        {value}
      </dd>
      <dt className="mt-1 text-xs text-foreground-muted sm:text-sm">{label}</dt>
    </div>
  );
}
