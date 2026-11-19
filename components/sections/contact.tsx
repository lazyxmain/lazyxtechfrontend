'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Mail, Linkedin, MapPin, CheckCircle2, Loader2 } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { Reveal } from '@/components/reveal';
import { Magnetic } from '@/components/magnetic';
import { getSupabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';

const projectTypes = [
  'Website Development',
  'Web Application',
  'E-commerce',
  'Backend & API',
  'Other',
];

const budgets = ['< $5k', '$5k – $15k', '$15k – $40k', '$40k+'];

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle'
  );
  const [errorMsg, setErrorMsg] = useState('');

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
      project_type: String(data.get('project_type') || '').trim(),
      budget: String(data.get('budget') || '').trim() || null,
      description: String(data.get('description') || '').trim(),
    };

    if (!payload.name || !payload.email || !payload.project_type || !payload.description) {
      setStatus('error');
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    let insertError: { message: string } | null = null;
    try {
      const sb = getSupabase();
      const { error } = await sb.from('project_inquiries').insert(payload);
      insertError = error;
    } catch (err) {
      insertError = err as { message: string };
    }
    if (insertError) {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again or email us directly.');
      return;
    }
    setStatus('success');
    form.reset();
  }

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <SectionHeading
          tag="Contact"
          title="Let's Start a Conversation."
          description="Tell us about your project. We'll get back to you within one business day."
          className="max-w-4xl"
        />

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
          {/* Left — contact info */}
          <div className="flex flex-col gap-6">
            <Reveal>
              <div className="rounded-2xl border border-border bg-surface p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-bg">
                    <Mail size={18} />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.14em] text-foreground-muted">
                      Email
                    </div>
                    <div className="font-medium">[Official Business Email]</div>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="rounded-2xl border border-border bg-surface p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-bg">
                    <Linkedin size={18} />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.14em] text-foreground-muted">
                      LinkedIn
                    </div>
                    <div className="font-medium">[Official LinkedIn URL]</div>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="rounded-2xl border border-border bg-surface p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-bg">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.14em] text-foreground-muted">
                      Location
                    </div>
                    <div className="font-medium">India | Working Worldwide</div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-auto rounded-2xl border border-border bg-bg p-6">
                <div className="flex items-center gap-2 text-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" style={{ animationDuration: '2s' }} />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
                  </span>
                  <span className="text-foreground-muted">
                    Currently accepting new projects
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right — form */}
          <Reveal delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-border bg-surface p-6 md:p-8"
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Name" required>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="Jane Doe"
                    className="input-base"
                  />
                </Field>
                <Field label="Work Email" required>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="jane@company.com"
                    className="input-base"
                  />
                </Field>
                <Field label="Company Name">
                  <input
                    name="company"
                    type="text"
                    placeholder="Company Inc."
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
                      placeholder="Tell us what you're building, your goals, and your timeline..."
                      className="input-base resize-none"
                    />
                  </Field>
                </div>
              </div>

              {status === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-sm text-red-500"
                >
                  {errorMsg}
                </motion.p>
              )}

              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-6 flex items-center gap-3 rounded-xl border border-lime/40 bg-lime/10 px-5 py-4"
                >
                  <CheckCircle2 size={20} className="text-foreground" />
                  <div>
                    <div className="font-semibold">Inquiry sent!</div>
                    <div className="text-sm text-foreground-muted">
                      We&apos;ll be in touch within one business day.
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="mt-6">
                  <Magnetic strength={0.25}>
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
          font-size: 0.9rem;
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
        {required && <span className="text-lime"> *</span>}
      </span>
      {children}
    </label>
  );
}
