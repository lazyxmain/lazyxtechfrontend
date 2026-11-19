/**
 * Hero showcase: a layered product mock-up (browser + phone + live chips)
 * that shows what we actually build. Pure HTML/CSS, no images, no JS.
 */
const BARS = [38, 62, 48, 80, 58, 92, 70];

export function HeroVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden="true">
      {/* soft brand glow */}
      <div className="absolute right-[4%] top-[8%] h-[78%] w-[78%] rounded-full bg-lime/30 blur-3xl" />
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            'radial-gradient(hsl(var(--foreground) / 0.12) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
          maskImage:
            'radial-gradient(ellipse at 60% 45%, #000 20%, transparent 70%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at 60% 45%, #000 20%, transparent 70%)',
        }}
      />

      {/* ───────── Browser window ───────── */}
      <div className="absolute right-0 top-[7%] h-[72%] w-[88%] overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)] sm:w-[84%]">
        {/* chrome */}
        <div className="flex items-center gap-3 border-b border-border bg-bg px-3.5 py-2.5">
          <span className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
            <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
            <span className="h-2 w-2 rounded-full bg-[#28c840]" />
          </span>
          <span className="flex h-5 flex-1 items-center justify-center rounded-md bg-foreground/[0.06] text-[9px] font-medium text-foreground-muted sm:text-[10px]">
            yourbrand.com
          </span>
        </div>

        {/* page */}
        <div className="grid h-[calc(100%-2.4rem)] grid-cols-[1.15fr_1fr] gap-3 p-3.5 sm:gap-4 sm:p-5">
          <div className="flex min-w-0 flex-col">
            <span className="h-1.5 w-10 rounded-full bg-lime" />
            <span className="mt-3 h-3 w-[92%] rounded-full bg-foreground/80 sm:h-3.5" />
            <span className="mt-2 h-3 w-[70%] rounded-full bg-foreground/80 sm:h-3.5" />
            <span className="mt-4 h-1.5 w-[88%] rounded-full bg-foreground/15" />
            <span className="mt-1.5 h-1.5 w-[74%] rounded-full bg-foreground/15" />
            <span className="mt-1.5 hidden h-1.5 w-[60%] rounded-full bg-foreground/15 sm:block" />
            <span className="mt-4 flex gap-2">
              <span className="h-5 w-16 rounded-md bg-foreground sm:h-6 sm:w-20" />
              <span className="h-5 w-12 rounded-md border border-border sm:h-6 sm:w-14" />
            </span>

            <div className="mt-auto grid grid-cols-3 gap-2">
              {['Fast', 'Scalable', 'Secure'].map((t) => (
                <span
                  key={t}
                  className="rounded-lg border border-border bg-bg px-1.5 py-1.5 text-center text-[8px] font-semibold text-foreground/70 sm:text-[10px]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* analytics card */}
          <div className="flex min-w-0 flex-col rounded-xl border border-border bg-bg p-2.5 sm:p-3.5">
            <div className="flex items-center justify-between">
              <span className="text-[8px] font-medium uppercase tracking-wider text-foreground-muted sm:text-[9px]">
                Revenue
              </span>
              <span className="rounded-full bg-lime/40 px-1.5 py-0.5 text-[8px] font-bold sm:text-[9px]">
                +38%
              </span>
            </div>
            <div className="mt-1 font-display text-base font-semibold leading-none sm:text-xl">
              $48.2k
            </div>
            <div className="mt-auto flex h-[46%] items-end gap-1 sm:gap-1.5">
              {BARS.map((h, i) => (
                <span
                  key={i}
                  className="hero-bar w-full rounded-t-[3px] bg-foreground/85 last:bg-lime"
                  style={
                    {
                      height: `${h}%`,
                      '--d': `${0.7 + i * 0.07}s`,
                    } as React.CSSProperties
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ───────── Phone ───────── */}
      <div className="absolute bottom-0 left-[1%] w-[27%] min-w-[92px] max-w-[150px] sm:left-0">
        <div className="animate-float-slow aspect-[9/18.5] rounded-[1.6rem] border-[3px] border-foreground/90 bg-surface p-1.5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.45)]">
          <div className="flex h-full flex-col overflow-hidden rounded-[1.2rem] bg-bg">
            <span className="mx-auto mt-1.5 h-1 w-8 rounded-full bg-foreground/80" />
            <div className="mt-2 px-2">
              <span className="block h-1.5 w-10 rounded-full bg-foreground/70" />
              <span className="mt-1 block h-1 w-6 rounded-full bg-foreground/20" />
            </div>
            <div className="mx-2 mt-2 aspect-[4/3] rounded-lg bg-gradient-to-br from-lime to-lime/40" />
            <div className="mt-2 grid grid-cols-2 gap-1.5 px-2">
              {[0, 1].map((i) => (
                <div key={i} className="rounded-md border border-border bg-surface p-1">
                  <span className="block aspect-square rounded bg-foreground/10" />
                  <span className="mt-1 block h-1 w-3/4 rounded-full bg-foreground/25" />
                  <span className="mt-0.5 block h-1 w-1/2 rounded-full bg-lime" />
                </div>
              ))}
            </div>
            <span className="mx-2 mb-2 mt-auto block h-5 rounded-md bg-foreground" />
          </div>
        </div>
      </div>

      {/* ───────── Performance chip ───────── */}
      <div className="animate-float absolute left-[2%] top-[2%] sm:left-[-1%] sm:top-[4%]">
        <div className="glass flex items-center gap-2.5 rounded-2xl px-3 py-2.5 shadow-lg">
          <svg viewBox="0 0 36 36" className="h-9 w-9 -rotate-90">
            <circle cx="18" cy="18" r="15" fill="none" strokeWidth="3.5" className="stroke-foreground/10" />
            <circle
              cx="18"
              cy="18"
              r="15"
              fill="none"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray="94.2"
              strokeDashoffset="0"
              style={{ stroke: 'hsl(var(--accent))' }}
            />
          </svg>
          <div className="leading-tight">
            <div className="font-display text-sm font-bold">100</div>
            <div className="text-[9px] font-medium uppercase tracking-wider text-foreground-muted">
              Performance
            </div>
          </div>
        </div>
      </div>

      {/* ───────── Terminal chip ───────── */}
      <div className="absolute bottom-[3%] right-[2%] hidden sm:block">
        <div
          className="animate-float rounded-xl bg-[#0f0f0f] px-4 py-3 font-mono text-[10px] leading-relaxed text-white/80 shadow-2xl"
          style={{ animationDelay: '-2.5s' }}
        >
          <div className="text-white/40">$ npm run deploy</div>
          <div>
            <span className="text-lime">✓</span> Build passed
          </div>
          <div>
            <span className="text-lime">✓</span> Live in 38s
            <span className="hero-caret ml-1 inline-block h-2.5 w-1 translate-y-0.5 bg-lime" />
          </div>
        </div>
      </div>

      {/* ───────── Uptime chip ───────── */}
      <div className="absolute right-[3%] top-[0%] hidden md:block">
        <div
          className="animate-float-slow glass flex items-center gap-2 rounded-full px-3 py-1.5 shadow-md"
          style={{ animationDelay: '-1s' }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
          </span>
          <span className="text-[10px] font-semibold">99.9% uptime</span>
        </div>
      </div>
    </div>
  );
}
