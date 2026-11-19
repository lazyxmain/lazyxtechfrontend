'use client';

import { ArrowUpRight } from 'lucide-react';
import { Magnetic } from '@/components/magnetic';
import { Reveal } from '@/components/reveal';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const services = [
  'Website Development',
  'Web Application Development',
  'E-commerce Development',
  'Backend & API Development',
];

const socials = [
  { label: 'LinkedIn', href: '#' },
  { label: 'X / Twitter', href: '#' },
  { label: 'GitHub', href: '#' },
  { label: 'Instagram', href: '#' },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-surface">
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-20">
        {/* top CTA strip */}
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 border-b border-border pb-12 md:flex-row md:items-center">
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
                Ready to build something?
              </h2>
              <p className="mt-2 text-foreground-muted">
                Let&apos;s turn your idea into a powerful digital product.
              </p>
            </div>
            <Magnetic href="#contact" strength={0.3}>
              <span className="group flex items-center gap-2 rounded-xl bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition-colors hover:bg-lime hover:text-lime-fg">
                Let&apos;s Talk
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </Magnetic>
          </div>
        </Reveal>

        {/* main grid */}
        <div className="grid grid-cols-2 gap-8 py-12 md:grid-cols-4 lg:grid-cols-5">
          {/* brand */}
          <div className="col-span-2 lg:col-span-2">
            <a href="#home" className="flex items-center gap-2.5">
              <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-foreground text-background">
                <span className="font-display text-lg font-bold">L</span>
                <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-lime ring-2 ring-surface" />
              </span>
              <span className="font-display text-lg font-semibold tracking-tight">
                Lazy<span className="text-foreground-muted">X</span>Tech
              </span>
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-foreground-muted">
              Global digital product &amp; software development agency. We build
              websites, web apps and scalable software for ambitious businesses.
            </p>
            <p className="mt-5 text-sm font-medium text-foreground/80">
              India · Working Worldwide
            </p>
          </div>

          {/* navigation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground-muted">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-foreground/70 transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* services */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground-muted">
              Services
            </h3>
            <ul className="mt-4 space-y-2.5">
              {services.map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    className="text-sm text-foreground/70 transition-colors hover:text-foreground"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* social */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground-muted">
              Social
            </h3>
            <ul className="mt-4 space-y-2.5">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="group inline-flex items-center gap-1 text-sm text-foreground/70 transition-colors hover:text-foreground"
                  >
                    {s.label}
                    <ArrowUpRight
                      size={13}
                      className="opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* bottom */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-xs text-foreground-muted">
            © {new Date().getFullYear()} LazyXTech. All rights reserved.
          </p>
          <p className="font-display text-xs italic text-foreground-muted">
            Designed with purpose. Built with technology.
          </p>
        </div>
      </div>

      {/* oversized wordmark */}
      <div className="overflow-hidden">
        <div className="select-none px-5 text-center">
          <span className="font-display text-[18vw] font-bold leading-[0.8] tracking-tighter text-foreground/[0.04] md:text-[14vw]">
            LazyXTech
          </span>
        </div>
      </div>
    </footer>
  );
}
