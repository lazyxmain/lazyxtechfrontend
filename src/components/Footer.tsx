import { ArrowUpRight, Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { scrollToId } from './ScrollProvider';

const NAV = [
  { label: 'Home', id: 'home' },
  { label: 'Services', id: 'services' },
  { label: 'Work', id: 'work' },
  { label: 'About', id: 'about' },
  { label: 'Contact', id: 'contact' },
];

const SERVICES = [
  'Website Development',
  'Web Application Development',
  'E-commerce Development',
  'Backend & API Development',
];

const SOCIALS = [
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Twitter, label: 'Twitter / X', href: '#' },
  { icon: Github, label: 'GitHub', href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-line bg-ink-soft">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-ink-card">
                <svg width="16" height="16" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                  <path d="M3 2v8.5h7.5" stroke="#C5F36B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="11" cy="4" r="1.8" fill="#718CFF" />
                </svg>
              </span>
              <span className="font-display text-xl font-semibold tracking-tight text-chalk">
                Lazy<span className="text-lime-electric">X</span>Tech
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-chalk-dim">
              Global digital product &amp; software development agency. We design, engineer and
              scale digital products for ambitious businesses worldwide.
            </p>
            <div className="mt-6 flex gap-2.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-chalk-dim transition-all duration-300 hover:border-lime-electric/50 hover:text-lime-electric"
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-chalk-dim">Navigation</h3>
            <ul className="mt-5 space-y-3">
              {NAV.map((n) => (
                <li key={n.id}>
                  <button
                    onClick={() => scrollToId(n.id)}
                    className="text-sm text-chalk-dim transition-colors duration-300 hover:text-lime-electric"
                  >
                    {n.label}
                  </button>
                </li>
              ))}
              <li>
                <Link to="/blog" className="text-sm text-chalk-dim transition-colors duration-300 hover:text-lime-electric">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-chalk-dim transition-colors duration-300 hover:text-lime-electric">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-chalk-dim transition-colors duration-300 hover:text-lime-electric">
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </nav>

          {/* Services */}
          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-chalk-dim">Services</h3>
            <ul className="mt-5 space-y-3">
              {SERVICES.map((s) => (
                <li key={s}>
                  <button
                    onClick={() => scrollToId('services')}
                    className="text-left text-sm text-chalk-dim transition-colors duration-300 hover:text-lime-electric"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-chalk-dim">Start Today</h3>
            <p className="mt-5 text-sm leading-relaxed text-chalk-dim">
              Have a product in mind? We&apos;re ready to scope it with you.
            </p>
            <button
              onClick={() => scrollToId('contact')}
              className="group mt-5 inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-chalk transition-all duration-300 hover:border-lime-electric/60 hover:text-lime-electric"
            >
              Let&apos;s Talk
              <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 md:flex-row">
          <p className="text-xs text-chalk-dim">
            © {new Date().getFullYear()} LazyXTech. All rights reserved. ·{' '}
            <Link to="/privacy" className="transition-colors hover:text-lime-electric">Privacy</Link>
            {' '}·{' '}
            <Link to="/terms" className="transition-colors hover:text-lime-electric">Terms</Link>
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-chalk-dim/70">
            Designed with purpose. Built with technology.
          </p>
        </div>
      </div>
    </footer>
  );
}
