'use client';

import { useRef, useState } from 'react';
import {
  ArrowUpRight,
  Mail,
  Linkedin,
  MapPin,
  Phone,
  MessageCircle,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { Reveal } from '@/components/reveal';
import { Magnetic } from '@/components/magnetic';
import { cn } from '@/lib/utils';
import { COMPANY, LOCATION_LABEL, buildMailto } from '@/lib/site';

const projectTypes = [
  'Custom Website (Next.js / React)',
  'WordPress Website',
  'Shopify Store',
  'Mobile App (React Native / Expo)',
  'Not sure yet',
];

const budgets = [
  'Under ₹30,000',
  '₹30,000 – ₹1,00,000',
  '₹1,00,000 – ₹3,00,000',
  '₹3,00,000+',
  'Not decided yet',
];

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle'
  );
  const [errorMsg, setErrorMsg] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  function openFormattedEmail() {
    const f = formRef.current;
    const get = (n: string) =>
      f ? String((new FormData(f).get(n) as string) || '').trim() : '';
    window.location.href = buildMailto({
      service: get('project_type') || undefined,
      name: get('name'),
      company: get('company'),
      phone: get('phone'),
      budget: get('budget'),
      details: get('description'),
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get('name') || '').trim(),
      email: String(data.get('email') || '').trim(),
      company: String(data.get('company') || '').trim() || null,
      phone: String(data.get('phone') || '').trim() || null,
      project_type: String(data.get('project_type') || '').trim(),
      budget: String(data.get('budget') || '').trim() || null,
      description: String(data.get('description') || '').trim(),
    };

    if (!payload.name || !payload.email || !payload.project_type || !payload.description) {
      setStatus('error');
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    try {
      const response=await fetch('/api/contact',{
        method:'POST',
        headers:{'Content-Type':'application/json','Accept':'application/json'},
        body:JSON.stringify(payload),
      });
      const result=await response.json().catch(()=>({}));
      if(!response.ok)throw new Error(result.error||'Unable to send your inquiry right now.');
    } catch(err:any) {
      setStatus('error');
      setErrorMsg(err?.message||'Something went wrong. Please try again, or call or email us directly.');
      return;
    }
    setStatus('success');
    form.reset();
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <SectionHeading
          tag="Contact"
          titleId="contact-title"
          title="Let's Start a Conversation."
          description="Call, WhatsApp, email or fill in the form. We reply to every inquiry within one business day."
          className="max-w-4xl"
        />

        <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-14 sm:gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
          {/* Left: contact info */}
          <div className="flex min-w-0 flex-col gap-4 sm:gap-5">
            <ContactCard
              icon={<Phone size={18} aria-hidden="true" />}
              label="Call"
              value={COMPANY.phoneDisplay}
              href={`tel:${COMPANY.phone}`}
              title={`Call LazyXTech on ${COMPANY.phoneDisplay}`}
            />
            <ContactCard
              icon={<MessageCircle size={18} aria-hidden="true" />}
              label="WhatsApp"
              value="Chat on WhatsApp"
              href={COMPANY.whatsapp}
              external
              title="Message LazyXTech on WhatsApp"
            />
            <ContactCard
              icon={<Mail size={18} aria-hidden="true" />}
              label="Email"
              value={COMPANY.email}
              href={buildMailto()}
              title="Email LazyXTech with a ready-made project inquiry"
              delay={0.08}
            />
            <ContactCard
              icon={<Linkedin size={18} aria-hidden="true" />}
              label="LinkedIn"
              value="LazyXTech on LinkedIn"
              href={COMPANY.linkedin}
              external
              title="LazyXTech LinkedIn profile"
              delay={0.12}
            />
            <ContactCard
              icon={<MapPin size={18} aria-hidden="true" />}
              label="Location"
              value={LOCATION_LABEL}
              delay={0.16}
            />

            <Reveal delay={0.2}>
              <div className="rounded-2xl border border-border bg-bg p-5">
                <div className="flex items-center gap-2 text-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" style={{ animationDuration: '2s' }} />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
                  </span>
                  <span className="text-foreground-muted">
                    Accepting new projects · 6 months support included
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right — form */}
          <Reveal delay={0.1}>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="rounded-2xl border border-border bg-surface p-5 sm:p-6 md:p-8"
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Name" required>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="Your full name" autoComplete="name"
                    className="input-base"
                  />
                </Field>
                <Field label="Email" required>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com" autoComplete="email"
                    className="input-base"
                  />
                </Field>
                <Field label="Phone / WhatsApp">
                  <input name="phone" type="tel" placeholder="+91 98765 43210" autoComplete="tel" className="input-base" />
                </Field>
                <Field label="Business / Company">
                  <input
                    name="company"
                    type="text"
                    placeholder="Your business or brand" autoComplete="organization"
                    className="input-base"
                  />
                </Field>
                <Field label="Project Type" required>
                  <select name="project_type" required className="input-base" defaultValue="">
                    <option value="" disabled>
                      Select type
                    </option>
                    {projectTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Estimated Budget">
                  <select name="budget" className="input-base" defaultValue="">
                    <option value="" disabled>
                      Select range
                    </option>
                    {budgets.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Project Description" required>
                    <textarea
                      name="description"
                      required
                      rows={5}
                      placeholder="Tell us what you need, your goals and when you want to launch..."
                      className="input-base resize-none"
                    />
                  </Field>
                </div>
              </div>

              {status === 'error' && (
                <p role="alert" className="mt-4 text-sm text-red-500">
                  {errorMsg}
                </p>
              )}

              {status === 'success' ? (
                <div role="status" className="mt-6 flex items-center gap-3 rounded-xl border border-lime/40 bg-lime/10 px-5 py-4">
                  <CheckCircle2 size={20} className="text-foreground" />
                  <div>
                    <div className="font-semibold">Inquiry sent!</div>
                    <div className="text-sm text-foreground-muted">
                      We will contact you within one business day.
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Magnetic strength={0.25} className="w-full sm:w-auto">
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="group flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-7 py-4 text-sm font-semibold text-background transition-colors hover:bg-lime hover:text-lime-fg disabled:opacity-60 sm:w-auto"
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Project Inquiry
                          <ArrowUpRight
                            size={18}
                            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          />
                        </>
                      )}
                    </button>
                  </Magnetic>
                  <button
                    type="button"
                    onClick={openFormattedEmail}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-border px-6 py-4 text-sm font-semibold transition-colors hover:border-foreground/40 sm:w-auto"
                  >
                    <Mail size={18} aria-hidden="true" />
                    Send as Email
                  </button>
                </div>
              )}
            </form>
          </Reveal>
        </div>
      </div>

      <style jsx>{`
        :global(.input-base) {
          width: 100%;
          border-radius: 0.625rem;
          border: 1px solid hsl(var(--border));
          background-color: hsl(var(--bg));
          padding: 0.75rem 0.875rem;
          font-size: 1rem;
          color: hsl(var(--foreground));
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        :global(.input-base:focus) {
          outline: none;
          border-color: hsl(var(--accent));
          box-shadow: 0 0 0 3px hsl(var(--accent) / 0.18);
        }
        :global(.input-base::placeholder) {
          color: hsl(var(--foreground-muted) / 0.6);
        }
      `}</style>
    </section>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className={cn('flex flex-col gap-2')}>
      <span className="text-xs font-medium uppercase tracking-[0.1em] text-foreground-muted">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </span>
      {children}
    </label>
  );
}

function ContactCard({
  icon,
  label,
  value,
  href,
  external,
  title,
  delay = 0,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
  title?: string;
  delay?: number;
}) {
  const inner = (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-bg">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-xs uppercase tracking-[0.14em] text-foreground-muted">
          {label}
        </div>
        <div className="break-words font-medium">{value}</div>
      </div>
    </div>
  );
  return (
    <Reveal delay={delay}>
      {href ? (
        <a
          href={href}
          title={title}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="block rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-foreground/30"
        >
          {inner}
        </a>
      ) : (
        <div className="rounded-2xl border border-border bg-surface p-5">{inner}</div>
      )}
    </Reveal>
  );
}
