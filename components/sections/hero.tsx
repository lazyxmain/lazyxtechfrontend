import { ArrowUpRight, Globe } from 'lucide-react';
import { Magnetic } from '@/components/magnetic';
import { HeroVisual } from '@/components/hero-visual';

const d = (s: number) => ({ '--d': `${s}s` } as React.CSSProperties);

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
            className="hero-in inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/60 px-3.5 py-2 text-[11px] font-medium sm:px-4 sm:text-xs"
          >
            <span className="relative flex h-2 w-2">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75"
                style={{ animationDuration: '2s' }}
              />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
            </span>
            Available for Global Projects
          </div>

          <h1
            id="hero-title"
            className="mt-5 text-balance font-display text-[2.15rem] font-semibold leading-[1.06] tracking-ultra min-[400px]:text-[2.5rem] sm:mt-6 sm:text-6xl lg:text-[4.2rem]"
          >
            <span className="hero-in block" style={d(0.1)}>We Build</span>
            <span className="hero-in block" style={d(0.18)}>Digital Products</span>
            <span className="hero-in block" style={d(0.26)}>
              That Move{' '}
              <span className="relative inline-block">
                <span className="relative z-10">Businesses</span>
                <span className="hero-underline absolute bottom-1 left-0 h-2.5 w-full bg-lime sm:h-3" />
              </span>
            </span>
            <span className="hero-in block" style={d(0.34)}>Forward.</span>
          </h1>

          <p
            style={d(0.45)}
            className="hero-in mt-6 max-w-xl text-base leading-relaxed text-foreground-muted sm:mt-7 sm:text-lg"
          >
            From high-performance websites and custom web applications to
            scalable software and e-commerce platforms, we help ambitious
            businesses turn ideas into powerful digital experiences.
          </p>

          <div
            style={d(0.55)}
            className="hero-in mt-8 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap min-[420px]:items-center sm:mt-9"
          >
            <Magnetic href="#contact" strength={0.4} className="w-full min-[420px]:w-auto">
              <span className="group flex items-center justify-center gap-2 rounded-xl bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition-colors hover:bg-lime hover:text-lime-fg">
                Start a Project
                <ArrowUpRight
                  size={18}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </span>
            </Magnetic>
            <Magnetic href="#work" strength={0.3} className="w-full min-[420px]:w-auto">
              <span className="group flex items-center justify-center gap-2 rounded-xl border border-border bg-surface/40 px-7 py-3.5 text-sm font-semibold transition-colors hover:border-foreground/30">
                Explore Our Work
                <ArrowUpRight
                  size={18}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </span>
            </Magnetic>
          </div>

          <div
            style={d(0.65)}
            className="hero-in mt-10 flex items-start gap-2 text-xs leading-relaxed text-foreground-muted sm:mt-12"
          >
            <Globe size={14} className="mt-0.5 shrink-0 text-lime" />
            USA · UK · Canada · Australia · Europe · India
          </div>
        </div>

        {/* Visual */}
        <div
          style={d(0.3)}
          className="hero-in relative h-[320px] w-full sm:h-[440px] lg:h-[560px]"
        >
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
