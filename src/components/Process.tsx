import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Search, Map, PenTool, Rocket, LifeBuoy } from 'lucide-react';
import { SectionTag, RevealText } from './motion';

const STEPS = [
  { num: '01', title: 'Discover', desc: 'Understand your business, goals and requirements.', icon: Search },
  { num: '02', title: 'Strategize', desc: 'Define the solution, scope and development roadmap.', icon: Map },
  { num: '03', title: 'Design & Build', desc: 'Create and develop the digital product.', icon: PenTool },
  { num: '04', title: 'Launch', desc: 'Test, deploy and deliver the final solution.', icon: Rocket },
  { num: '05', title: 'Support & Scale', desc: 'Continue improving and supporting the product.', icon: LifeBuoy },
];

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.6'] });
  const raw = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const progress = useSpring(raw, { stiffness: 70, damping: 22 });

  return (
    <section className="relative py-28 md:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-[380px] w-[380px] rounded-full bg-lime-electric/[0.05] blur-[120px]"
      />
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <SectionTag index="03" label="Our Process" />
        <RevealText
          as="h2"
          text="From Concept to Launch."
          className="mt-6 block font-display text-4xl font-semibold tracking-tight md:text-6xl"
        />

        <div ref={ref} className="relative mt-20 pl-10 md:pl-0">
          {/* Vertical rail with glowing progress */}
          <div className="absolute left-[7px] top-0 h-full w-px bg-white/10 md:left-1/2" aria-hidden="true">
            <motion.div
              className="h-full w-full origin-top bg-gradient-to-b from-lime-electric via-lime-electric/70 to-voltage"
              style={{ scaleY: progress }}
            />
          </div>

          <ol className="space-y-14 md:space-y-20">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              const leftSide = i % 2 === 0;
              return (
                <li key={step.num} className="relative">
                  {/* Node dot */}
                  <motion.span
                    aria-hidden="true"
                    className="absolute -left-10 top-1 flex h-4 w-4 items-center justify-center md:left-1/2 md:-translate-x-1/2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                  >
                    <span className="absolute h-4 w-4 rounded-full bg-lime-electric/20" />
                    <span className="h-2 w-2 rounded-full bg-lime-electric" />
                  </motion.span>

                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className={`flex items-start gap-5 md:w-[calc(50%-3rem)] ${
                      leftSide ? 'md:mr-auto md:flex-row-reverse md:text-right' : 'md:ml-auto'
                    }`}
                  >
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-line bg-ink-card ${
                        leftSide ? '' : ''
                      }`}
                    >
                      <Icon size={20} className="text-lime-electric" strokeWidth={1.7} />
                    </div>
                    <div>
                      <span className="font-mono text-xs tracking-[0.25em] text-voltage">{step.num}</span>
                      <h3 className="mt-1.5 font-display text-2xl font-semibold text-chalk">{step.title}</h3>
                      <p className="mt-2 max-w-sm text-sm leading-relaxed text-chalk-dim">{step.desc}</p>
                    </div>
                  </motion.div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
