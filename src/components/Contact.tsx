import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, Loader2, AlertCircle, Mail, Linkedin, MapPin } from 'lucide-react';
import { getSupabase } from '../lib/supabase';
import { Reveal, SectionTag, RevealText, Magnetic } from './motion';

const PROJECT_TYPES = ['Website Development', 'Web Application', 'E-commerce', 'Backend & API', 'Other'];
const BUDGETS = ['Under $5k', '$5k – $15k', '$15k – $50k', '$50k+', 'Let’s discuss'];

const inputCls =
  'w-full rounded-xl border border-line bg-ink-soft px-4 py-3.5 text-sm text-chalk placeholder:text-chalk-dim/50 outline-none transition-all duration-300 focus:border-lime-electric/60 focus:bg-ink-card focus:ring-2 focus:ring-lime-electric/15';

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    setErrorMsg('');

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get('name') || '').trim(),
      email: String(fd.get('email') || '').trim(),
      company: String(fd.get('company') || '').trim() || null,
      project_type: String(fd.get('project_type') || ''),
      budget: String(fd.get('budget') || '') || null,
      description: String(fd.get('description') || '').trim(),
    };

    const supabase = getSupabase();
    if (!supabase) {
      setErrorMsg(
        'The inquiry service is not connected yet. Please reach us by email or LinkedIn instead.'
      );
      setStatus('error');
      return;
    }

    const { error } = await supabase.from('project_inquiries').insert(payload);

    if (error) {
      setErrorMsg(
        'Something went wrong while sending your inquiry. Please try again, or reach us by email.'
      );
      setStatus('error');
    } else {
      setStatus('success');
    }
  }

  return (
    <section id="contact" className="relative py-28 md:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-voltage/[0.05] blur-[140px]"
      />
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
          {/* Left: pitch + channels */}
          <div>
            <SectionTag index="07" label="Contact" />
            <RevealText
              as="h2"
              text="Let's Build Something Together."
              className="mt-6 block font-display text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl"
            />
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-chalk-dim">
                Share a few details about your project and we&apos;ll come back with honest,
                practical next steps — whether that&apos;s a proposal or a short discovery call.
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <ul className="mt-10 space-y-5">
                <li className="flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-ink-card">
                    <Mail size={18} className="text-lime-electric" strokeWidth={1.7} />
                  </span>
                  <div>
                    <span className="block text-[11px] uppercase tracking-[0.2em] text-chalk-dim">Email</span>
                    <span className="text-sm text-chalk">[Official Business Email]</span>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-ink-card">
                    <Linkedin size={18} className="text-lime-electric" strokeWidth={1.7} />
                  </span>
                  <div>
                    <span className="block text-[11px] uppercase tracking-[0.2em] text-chalk-dim">LinkedIn</span>
                    <span className="text-sm text-chalk">[Official LinkedIn URL]</span>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-ink-card">
                    <MapPin size={18} className="text-lime-electric" strokeWidth={1.7} />
                  </span>
                  <div>
                    <span className="block text-[11px] uppercase tracking-[0.2em] text-chalk-dim">Location</span>
                    <span className="text-sm text-chalk">India | Working Worldwide</span>
                  </div>
                </li>
              </ul>
            </Reveal>
          </div>

          {/* Right: form */}
          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-line bg-ink-card/60 p-7 backdrop-blur-md md:p-10">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="ok"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex min-h-[420px] flex-col items-center justify-center text-center"
                  >
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-lime-electric/10">
                      <CheckCircle2 size={30} className="text-lime-electric" />
                    </span>
                    <h3 className="mt-6 font-display text-2xl font-semibold text-chalk">
                      Inquiry received.
                    </h3>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-chalk-dim">
                      Thank you for reaching out. We&apos;ll review your project details and get
                      back to you shortly.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="mt-8 text-sm font-medium text-lime-electric underline-offset-4 hover:underline"
                    >
                      Send another inquiry
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={onSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="c-name" className="mb-2 block text-xs font-medium text-chalk-dim">
                          Name *
                        </label>
                        <input id="c-name" name="name" required maxLength={200} placeholder="Jane Smith" className={inputCls} />
                      </div>
                      <div>
                        <label htmlFor="c-email" className="mb-2 block text-xs font-medium text-chalk-dim">
                          Work Email *
                        </label>
                        <input id="c-email" name="email" type="email" required maxLength={320} placeholder="jane@company.com" className={inputCls} />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="c-company" className="mb-2 block text-xs font-medium text-chalk-dim">
                        Company Name
                      </label>
                      <input id="c-company" name="company" maxLength={200} placeholder="Company Inc." className={inputCls} />
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="c-type" className="mb-2 block text-xs font-medium text-chalk-dim">
                          Project Type *
                        </label>
                        <select id="c-type" name="project_type" required defaultValue="Website Development" className={`${inputCls} appearance-none`}>
                          {PROJECT_TYPES.map((t) => (
                            <option key={t} value={t} className="bg-ink-card text-chalk">
                              {t}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="c-budget" className="mb-2 block text-xs font-medium text-chalk-dim">
                          Estimated Budget
                        </label>
                        <select id="c-budget" name="budget" defaultValue="" className={`${inputCls} appearance-none`}>
                          <option value="" className="bg-ink-card text-chalk">Select a range</option>
                          {BUDGETS.map((b) => (
                            <option key={b} value={b} className="bg-ink-card text-chalk">
                              {b}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="c-desc" className="mb-2 block text-xs font-medium text-chalk-dim">
                        Project Description *
                      </label>
                      <textarea
                        id="c-desc"
                        name="description"
                        required
                        maxLength={5000}
                        rows={5}
                        placeholder="What are you building? Goals, timeline, anything that helps us understand the vision."
                        className={`${inputCls} resize-none`}
                      />
                    </div>

                    {status === 'error' && (
                      <motion.p
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
                        role="alert"
                      >
                        <AlertCircle size={16} className="mt-0.5 shrink-0" />
                        {errorMsg}
                      </motion.p>
                    )}

                    <Magnetic className="w-full">
                      <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-lime-electric px-7 py-4 font-display text-sm font-semibold text-ink transition-all duration-300 hover:shadow-[0_0_36px_rgba(197,243,107,0.3)] disabled:opacity-60"
                      >
                        {status === 'sending' ? (
                          <>
                            <Loader2 size={16} className="animate-spin" /> Sending…
                          </>
                        ) : (
                          <>
                            Send Project Inquiry
                            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </>
                        )}
                      </button>
                    </Magnetic>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
