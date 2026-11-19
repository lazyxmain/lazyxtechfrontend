import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Magnetic } from './motion';
import { useTheme } from '../context/ThemeContext';
import { scrollToId } from './ScrollProvider';

const LINKS = [
  { label: 'Home', id: 'home' },
  { label: 'Services', id: 'services' },
  { label: 'Work', id: 'work' },
  { label: 'About', id: 'about' },
  { label: 'Contact', id: 'contact' },
];

function Wordmark({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="group flex items-center gap-2" aria-label="LazyXTech home">
      <span className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-ink-card">
        <span className="absolute inset-0 rounded-lg bg-lime-electric/0 transition-colors duration-300 group-hover:bg-lime-electric/10" />
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
          <path d="M3 2v8.5h7.5" stroke="#C5F36B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="11" cy="4" r="1.8" fill="#718CFF" />
        </svg>
      </span>
      <span className="font-display text-lg font-semibold tracking-tight text-chalk">
        Lazy<span className="text-lime-electric">X</span>Tech
      </span>
    </button>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = LINKS.map((l) => l.id);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [location.pathname]);

  const go = (id: string) => {
    setOpen(false);
    const goScroll = () => setTimeout(() => scrollToId(id), open ? 350 : 0);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(goScroll, 120);
    } else {
      goScroll();
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-[100] transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 md:px-7 ${
            scrolled ? 'glass shadow-[0_8px_40px_rgba(0,0,0,0.45)]' : 'bg-transparent'
          } mx-4 lg:mx-8`}
        >
          <Wordmark onClick={() => go('home')} />

          {/* Desktop links with animated indicator */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className={`relative rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                  active === l.id && location.pathname === '/' ? 'text-chalk' : 'text-chalk-dim hover:text-chalk'
                }`}
              >
                {active === l.id && location.pathname === '/' && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full border border-line bg-white/5"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{l.label}</span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              onClick={toggle}
              aria-label="Toggle light and dark theme"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-chalk-dim transition-colors duration-300 hover:border-lime-electric/50 hover:text-lime-electric"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
                </motion.span>
              </AnimatePresence>
            </button>

            <Magnetic className="hidden sm:inline-block">
              <button
                onClick={() => go('contact')}
                className="rounded-full bg-chalk px-5 py-2.5 font-display text-sm font-semibold text-ink transition-colors duration-300 hover:bg-lime-electric"
              >
                Let&apos;s Talk
              </button>
            </Magnetic>

            <button
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-chalk lg:hidden"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[95] flex flex-col justify-center bg-ink/95 px-8 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col gap-2" aria-label="Mobile">
              {LINKS.map((l, i) => (
                <motion.button
                  key={l.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: 0.06 * i, duration: 0.4 }}
                  onClick={() => go(l.id)}
                  className="border-b border-line py-4 text-left font-display text-3xl font-medium text-chalk transition-colors hover:text-lime-electric"
                >
                  <span className="mr-3 font-mono text-xs text-lime-electric">0{i + 1}</span>
                  {l.label}
                </motion.button>
              ))}
            </nav>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              onClick={() => go('contact')}
              className="mt-10 rounded-full bg-lime-electric py-4 font-display font-semibold text-ink"
            >
              Let&apos;s Talk
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
