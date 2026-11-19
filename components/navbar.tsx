'use client';

import { useEffect, useState } from 'react';
import { Menu, X, Sun, Moon, ArrowUpRight } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Magnetic } from '@/components/magnetic';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    let ticking = false;
    const update = () => {
      setScrolled(window.scrollY > 24);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[200] px-2 sm:px-3">
        <div
          className={cn(
            'mx-auto flex max-w-[1400px] items-center justify-between px-3 transition-[margin,padding,background-color,border-color] duration-300 sm:px-5 md:px-8',
            scrolled
              ? 'my-2 rounded-2xl border border-border/60 glass py-2.5 sm:my-3 sm:py-3'
              : 'my-0 border border-transparent py-4 sm:py-5'
          )}
        >
          <a
            href="#home"
            className="group flex items-center gap-2.5"
            aria-label="LazyXTech home"
          >
            <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-foreground text-background">
              <span className="font-display text-lg font-bold">L</span>
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-lime ring-2 ring-background" />
            </span>
            <span className="font-display text-lg font-semibold tracking-tight">
              Lazy<span className="text-foreground-muted">X</span>Tech
            </span>
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative px-4 py-2 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
              >
                {link.label}
                <span className="absolute bottom-1 left-4 h-px w-0 bg-foreground transition-all duration-300 group-hover:w-[calc(100%-2rem)]" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={() => mounted && setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-foreground/80 transition-colors hover:border-foreground/40 hover:text-foreground"
            >
              {mounted && theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <Magnetic href="#contact" className="hidden md:inline-block">
              <span className="group flex items-center gap-2 rounded-xl bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-lime hover:text-lime-fg">
                Let&apos;s Talk
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </span>
            </Magnetic>

            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-foreground lg:hidden"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu: always mounted, toggled with CSS (no animation library) */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={cn(
          'fixed inset-0 z-[300] lg:hidden',
          open ? 'visible' : 'invisible delay-300'
        )}
      >
        <div
          onClick={() => setOpen(false)}
          className={cn(
            'absolute inset-0 bg-foreground/40 backdrop-blur-sm transition-opacity duration-300',
            open ? 'opacity-100' : 'opacity-0'
          )}
        />
        <div
          className={cn(
            'absolute right-0 top-0 flex h-full w-[85%] max-w-sm flex-col overflow-y-auto bg-bg p-6 shadow-2xl transition-transform duration-300 ease-out',
            open ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <div className="flex items-center justify-between">
            <span className="font-display text-lg font-semibold">LazyXTech</span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border"
            >
              <X size={18} />
            </button>
          </div>

          <nav aria-label="Mobile" className="mt-8 flex flex-col">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                style={
                  open
                    ? {
                        animation: 'mobile-menu-item 0.4s ease-out both',
                        animationDelay: `${0.08 + i * 0.05}s`,
                      }
                    : undefined
                }
                className="flex items-center justify-between border-b border-border py-4 font-display text-2xl font-medium tracking-tight"
              >
                {link.label}
                <ArrowUpRight size={20} className="text-foreground-muted" />
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
            className="mt-8 flex items-center justify-center gap-2 rounded-xl bg-lime py-4 text-base font-semibold text-lime-fg"
          >
            Start a Project
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </>
  );
}
