'use client';

/**
 * Lightweight hero visual: CSS-only floating panels, orbit rings and a core
 * orb. No animation library, no mouse listeners, GPU-friendly transforms only.
 */
export function HeroVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden="true">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-fade" />

      {/* orbit rings */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="animate-orbit relative h-[240px] w-[240px] rounded-full border border-foreground/10 sm:h-[340px] sm:w-[340px]">
          <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-lime shadow-[0_0_12px_rgba(197,243,107,0.8)]" />
        </div>
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="animate-orbit-rev relative h-[300px] w-[300px] rounded-full border border-foreground/[0.06] sm:h-[420px] sm:w-[420px]">
          <span className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-foreground/30" />
          <span className="absolute bottom-6 right-10 h-1 w-1 rounded-full bg-lime/60" />
        </div>
      </div>

      {/* core orb */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="animate-float-slow relative flex h-28 w-28 items-center justify-center sm:h-40 sm:w-40">
          <div className="absolute inset-0 rounded-full bg-lime/25 blur-xl" />
          <div className="relative h-full w-full overflow-hidden rounded-full bg-gradient-to-br from-lime via-lime/80 to-lime/40">
            <div className="absolute left-3 top-3 h-1/3 w-1/3 rounded-full bg-white/40 blur-md" />
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(0,0,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.3) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />
          </div>
        </div>
      </div>

      {/* panels */}
      <div className="absolute right-[6%] top-[10%] sm:right-[8%] sm:top-[14%]">
        <div className="animate-float glass rounded-2xl px-3 py-2.5 shadow-lg sm:px-4 sm:py-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-lime" />
            <span className="text-[11px] font-semibold sm:text-xs">React · Next.js</span>
          </div>
          <div className="mt-2 flex gap-1.5">
            <div className="h-1 w-8 rounded-full bg-foreground/15" />
            <div className="h-1 w-12 rounded-full bg-foreground/10" />
          </div>
          <div className="mt-1.5 h-1.5 w-16 rounded-full bg-lime/70" />
        </div>
      </div>

      <div className="absolute bottom-[12%] left-[4%] sm:bottom-[16%] sm:left-[6%]">
        <div
          className="animate-float-slow glass rounded-2xl px-3 py-2.5 shadow-lg sm:px-4 sm:py-3"
          style={{ animationDelay: '-2s' }}
        >
          <div className="flex items-center justify-between gap-3">
            <span className="text-[10px] font-medium uppercase tracking-wider text-foreground-muted">
              Lighthouse
            </span>
            <span className="text-xs font-bold text-foreground">100</span>
          </div>
          <div className="mt-2 flex h-6 items-end gap-1">
            {[40, 70, 50, 90, 60].map((h, i) => (
              <span
                key={i}
                className="w-1.5 rounded-t-sm bg-lime"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-[24%] right-[12%] hidden md:block">
        <div
          className="animate-float glass flex items-center gap-2 rounded-full px-3 py-1.5 shadow-md"
          style={{ animationDelay: '-1s' }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
          <span className="text-[10px] font-medium">TypeScript</span>
        </div>
      </div>

      {/* particles */}
      {[...Array(8)].map((_, i) => (
        <span
          key={i}
          className="animate-twinkle absolute rounded-full bg-foreground/20"
          style={{
            left: `${((i * 37) % 90) + 5}%`,
            top: `${((i * 53) % 85) + 5}%`,
            width: (i % 3) + 2,
            height: (i % 3) + 2,
            animationDelay: `${-(i * 0.6)}s`,
          }}
        />
      ))}
    </div>
  );
}
