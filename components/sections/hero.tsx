import { ArrowUpRight, MapPin } from 'lucide-react';
import { Magnetic } from '@/components/magnetic';
import { HeroVisual } from '@/components/hero-visual';

const d = (s: number) => ({ '--d': `${s}s` } as React.CSSProperties);

const stats = [
  { value: '5+', label: 'Years of experience' },
  { value: 'Global', label: 'Clients served' },
  { value: '6 mo', label: 'Support after launch' },
];

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative w-full overflow-hidden pt-24 sm:pt-28 md:pt-32 lg:min-h-[100svh]"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 top-20 h-[360px] w-[360px] rounded-full bg-accent-fade sm:-left-40 sm:h-[520px] sm:w-[520px]" />
      </div>

      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-6 px-5 pb-14 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-4 lg:pb-16">
        {/* Copy */}
        <div className="relative z-10 min-w-0">
          <div
            style={d(0.05)}
            className="hero-in inline-flex max-w-full items-center gap-2.5 rounded-full border border-border bg-surface/60 px-3.5 py-2 text-[11px] font-medium sm:px-4 sm:text-xs"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75"
                style={{ animationDuration: '2s' }}
              />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
            </span>
            <span className="min-w-0">
              5+ Years of Experience · Web &amp; App Development · Bhopal, India
            </span>
          </div>

          <h1
            id="hero-title"
            className="mt-5 text-balance font-display text-[2rem] font-semibold leading-[1.08] tracking-ultra min-[400px]:text-[2.35rem] sm:mt-6 sm:text-6xl lg:text-[4rem]"
          >
            <span className="hero-in block" style={d(0.1)}>
              Websites, Stores &amp; Apps That Grow Your Business{' '}
              <span className="relative inline-block">
                <span className="relative z-10">Globally.</span>
                <span className="hero-underline absolute bottom-1 left-0 h-2.5 w-full bg-lime sm:h-3" />
              </span>
            </span>
          </h1>

          <p
            style={d(0.25)}
            className="hero-in mt-6 max-w-xl text-base leading-relaxed text-foreground-muted sm:mt-7 sm:text-lg"
          >
            With more than 5 years in the development industry, LazyXTech
            delivers everything a business needs to get online, sell and scale:
            e-commerce stores, custom websites, WordPress, Shopify and mobile
            apps. We have helped clients grow their business globally, and every
            project is backed by 6 months of support after launch.
          </p>

          <div
            style={d(0.35)}
            className="hero-in mt-8 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap min-[420px]:items-center sm:mt-9"
          >
            <Magnetic href="#contact" strength={0.4} className="w-full min-[420px]:w-auto">
              <span className="group flex items-center justify-center gap-2 rounded-xl bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition-colors hover:bg-lime hover:text-lime-fg">
                Get a Free Quote
                <ArrowUpRight
                  size={18}
                  aria-hidden="true"
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </span>
            </Magnetic>
            <Magnetic href="#services" strength={0.3} className="w-full min-[420px]:w-auto">
              <span className="group flex items-center justify-center gap-2 rounded-xl border border-border bg-surface/40 px-7 py-3.5 text-sm font-semibold transition-colors hover:border-foreground/30">
                View Our Services
                <ArrowUpRight
                  size={18}
                  aria-hidden="true"
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </span>
            </Magnetic>
          </div>

          {/* Experience / trust stats */}
          <dl
            style={d(0.45)}
            className="hero-in mt-9 grid max-w-xl grid-cols-3 gap-3 sm:mt-11 sm:gap-4"
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-border bg-surface/60 px-3 py-3.5 sm:px-5 sm:py-4"
              >
                <dd className="font-display text-xl font-semibold leading-none tracking-tight sm:text-3xl">
                  {s.value}
                </dd>
                <dt className="mt-1.5 text-[10px] leading-tight text-foreground-muted sm:text-xs">
                  {s.label}
                </dt>
              </div>
            ))}
          </dl>

          <p
            style={d(0.55)}
            className="hero-in mt-5 flex items-center gap-2 text-xs text-foreground-muted sm:text-sm"
          >
            <MapPin size={15} className="shrink-0 text-foreground" aria-hidden="true" />
            Based in Bhopal, India · Serving clients worldwide
          </p>
        </div>

        {/* Visual */}
        <div
          style={d(0.3)}
          className="hero-in relative h-[340px] w-full sm:h-[440px] lg:h-[540px]"
        >
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
