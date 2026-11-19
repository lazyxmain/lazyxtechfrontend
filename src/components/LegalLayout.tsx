import { type ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Reveal } from '../components/motion';

export default function LegalLayout({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  children: ReactNode;
}) {
  const navigate = useNavigate();
  return (
    <main className="relative overflow-hidden pb-24 pt-36 md:pt-44">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-lime-electric/[0.05] blur-[150px]"
      />
      <article className="relative mx-auto max-w-3xl px-6 md:px-10">
        <Reveal>
          <button
            onClick={() => navigate(-1)}
            className="group mb-8 inline-flex items-center gap-2 text-sm text-chalk-dim transition-colors hover:text-lime-electric"
          >
            <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-0.5" />
            Back
          </button>
          <p className="eyebrow mb-4">{eyebrow}</p>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-chalk md:text-6xl">
            {title}
          </h1>
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.22em] text-chalk-dim">
            Last updated: {updated}
          </p>
        </Reveal>
        <div
          className="mt-12 space-y-8 text-[15px] leading-relaxed text-chalk-dim [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-chalk [&_li]:mt-2 [&_strong]:text-chalk"
        >
          {children}
        </div>
      </article>
    </main>
  );
}
