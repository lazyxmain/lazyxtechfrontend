'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, ArrowUpRight } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Magnetic } from '@/components/magnetic';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-[200]"
      >
        <div
          className={cn(
            'mx-auto flex max-w-[1400px] items-center justify-between px-5 transition-all duration-500 md:px-8',
            scrolled
              ? 'my-3 rounded-2xl border border-border/60 glass py-3'
              : 'my-0 border border-transparent py-5'
          )}
        >
          {/* Logo */}
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

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
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

          {/* Right actions */}
          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={() => mounted && setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-foreground/80 transition-colors hover:border-foreground/40 hover:text-foreground"
            >
              {mounted && theme === 'dark' ? (
                <Sun className="h-4.5 w-4.5" size={18} />
              ) : (
                <Moon className="h-4.5 w-4.5" size={18} />
              )}
            </button>

            <Magnetic
              href="#contact"
              className="hidden md:inline-block"
            >
              <span className="group flex items-center gap-2 rounded-xl bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-lime hover:text-lime-fg">
                Let&apos;s Talk
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </Magnetic>

            {/* Mobile toggle */}
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-foreground lg:hidden"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[300] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="absolute right-0 top-0 flex h-full w-[85%] max-w-sm flex-col bg-[hsl(var(--bg))] p-6"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-lg font-semibold">
                  LazyXTech
                </span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border"
                >
                  <X size={18} />
                </button>
              </div>

              <nav className="mt-10 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.07 }}
                    className="flex items-center justify-between border-b border-border py-4 font-display text-2xl font-medium tracking-tight"
                  >
                    {link.label}
                    <ArrowUpRight size={20} className="text-foreground-muted" />
                  </motion.a>
                ))}
              </nav>

              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-auto flex items-center justify-center gap-2 rounded-xl bg-lime py-4 text-base font-semibold text-lime-fg"
              >
                Start a Project
                <ArrowUpRight size={18} />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
