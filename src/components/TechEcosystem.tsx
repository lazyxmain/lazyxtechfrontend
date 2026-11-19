import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { SectionTag, Reveal, RevealText } from './motion';

const TECHS = [
  'React', 'Next.js', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'Node.js',
  'Fastify', 'MongoDB', 'MySQL', 'Redis', 'Shopify', 'Three.js',
];

interface Node2D {
  id: string;
  x: number;
  y: number;
}

export default function TechEcosystem() {
  const [hovered, setHovered] = useState<string | null>(null);

  // Fixed constellation layout (percent coordinates) — deterministic, responsive
  const nodes: Node2D[] = useMemo(
    () => [
      { id: 'React', x: 50, y: 46 },
      { id: 'Next.js', x: 26, y: 24 },
      { id: 'TypeScript', x: 72, y: 22 },
      { id: 'JavaScript', x: 12, y: 52 },
      { id: 'Node.js', x: 84, y: 50 },
      { id: 'Tailwind CSS', x: 30, y: 74 },
      { id: 'Fastify', x: 70, y: 72 },
      { id: 'MongoDB', x: 88, y: 78 },
      { id: 'MySQL', x: 46, y: 88 },
      { id: 'Redis', x: 8, y: 86 },
      { id: 'Shopify', x: 62, y: 6 },
      { id: 'Three.js', x: 92, y: 8 },
    ],
    []
  );

  const connections: [string, string][] = useMemo(
    () => [
      ['React', 'Next.js'], ['React', 'TypeScript'], ['React', 'Tailwind CSS'],
      ['React', 'Node.js'], ['React', 'JavaScript'], ['React', 'Three.js'],
      ['Node.js', 'Fastify'], ['Node.js', 'MySQL'], ['Node.js', 'MongoDB'],
      ['Node.js', 'Redis'], ['Next.js', 'Tailwind CSS'], ['Next.js', 'Shopify'],
      ['Fastify', 'MongoDB'], ['TypeScript', 'Node.js'],
    ],
    []
  );

  const nodeMap = useMemo(() => Object.fromEntries(nodes.map((n) => [n.id, n])), [nodes]);

  return (
    <section className="relative overflow-hidden py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionTag index="05" label="Technology Ecosystem" />
        <div className="mt-6 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <RevealText
            as="h2"
            text="Powered by Modern Technology."
            className="font-display text-4xl font-semibold tracking-tight md:text-6xl"
          />
          <Reveal delay={0.15}>
            <p className="max-w-xs text-[15px] leading-relaxed text-chalk-dim">
              A deliberate stack. Every tool earns its place in production.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-16 h-[440px] w-full select-none rounded-3xl border border-line bg-ink-soft/60 md:h-[520px]">
          {/* Connection lines */}
          <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
            {connections.map(([a, b]) => {
              const na = nodeMap[a];
              const nb = nodeMap[b];
              if (!na || !nb) return null;
              const active = hovered === a || hovered === b;
              return (
                <line
                  key={`${a}-${b}`}
                  x1={`${na.x}%`}
                  y1={`${na.y}%`}
                  x2={`${nb.x}%`}
                  y2={`${nb.y}%`}
                  stroke={active ? '#C5F36B' : 'rgba(255,255,255,0.12)'}
                  strokeWidth={active ? 1.5 : 1}
                  className="transition-all duration-300"
                />
              );
            })}
          </svg>

          {/* Floating nodes */}
          {nodes.map((n, i) => (
            <motion.button
              key={n.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-4 py-2 font-mono text-xs transition-colors duration-300"
              style={{
                left: `${n.x}%`,
                top: `${n.y}%`,
                borderColor: hovered === n.id ? '#C5F36B' : 'var(--c-line)',
                color: hovered === n.id ? '#C5F36B' : 'var(--c-dim)',
                backgroundColor: hovered === n.id ? 'rgba(197,243,107,0.08)' : 'var(--c-card)',
              }}
              animate={{
                y: [0, i % 2 === 0 ? -7 : 7, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 5 + (i % 4),
                ease: 'easeInOut',
                delay: i * 0.2,
              }}
              onMouseEnter={() => setHovered(n.id)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(n.id)}
              onBlur={() => setHovered(null)}
              aria-label={n.id}
            >
              {n.id}
            </motion.button>
          ))}

          {/* Center label */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <span className="font-display text-6xl font-semibold text-chalk/[0.07] md:text-7xl">STACK</span>
          </div>
        </div>
      </div>
    </section>
  );
}
