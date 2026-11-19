import { Link } from 'react-router-dom';
import { Home, FileText, Newspaper } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-electric/[0.06] blur-[130px]"
      />
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-chalk-dim">Error 404</p>
      <h1 className="mt-4 font-display text-6xl font-semibold tracking-tight text-chalk md:text-8xl">
        4<span className="text-lime-electric">0</span>4
      </h1>
      <p className="mt-4 max-w-sm text-chalk-dim">
        This page drifted out of orbit. Let&apos;s get you back to solid ground.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full bg-lime-electric px-6 py-3 font-display text-sm font-semibold text-ink transition-transform duration-300 hover:scale-[1.03]"
        >
          <Home size={15} /> Home
        </Link>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 font-display text-sm font-medium text-chalk transition-colors duration-300 hover:border-lime-electric/60 hover:text-lime-electric"
        >
          <Newspaper size={15} /> Blog
        </Link>
        <Link
          to="/privacy"
          className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 font-display text-sm font-medium text-chalk transition-colors duration-300 hover:border-lime-electric/60 hover:text-lime-electric"
        >
          <FileText size={15} /> Privacy
        </Link>
      </div>
    </main>
  );
}
