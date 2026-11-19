import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Clock } from 'lucide-react';
import { Reveal, SectionTag, RevealText } from '../components/motion';
import { POSTS } from '../content/posts';
import { useSEO } from '../lib/seo';

export default function Blog() {
  useSEO({
    title: 'Blog — LazyXTech',
    description:
      'Practical writing on engineering, performance and product strategy from the LazyXTech team.',
    path: '/blog',
  });

  return (
    <main className="relative overflow-hidden pb-28 pt-36 md:pt-44">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-lime-electric/[0.05] blur-[150px]"
      />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <SectionTag index="BL" label="Blog" />
        <div className="mt-6 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <RevealText
            as="h2"
            text="Notes From the Build Bench."
            className="font-display text-4xl font-semibold tracking-tight md:text-6xl"
          />
          <Reveal delay={0.15}>
            <p className="max-w-sm text-[15px] leading-relaxed text-chalk-dim">
              Practical writing on engineering, performance and shipping digital products.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {POSTS.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.08}>
              <Link
                to={`/blog/${post.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-ink-card p-8 transition-colors duration-500 hover:border-white/20"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      'radial-gradient(360px circle at 50% 0%, rgba(197,243,107,0.07), transparent 70%)',
                  }}
                />
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-lime-electric">
                    {post.category}
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="text-chalk-dim transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-lime-electric"
                  />
                </div>
                <h2 className="mt-6 font-display text-xl font-semibold leading-snug text-chalk">
                  {post.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-chalk-dim">{post.excerpt}</p>
                <div className="mt-6 flex items-center gap-3 border-t border-line pt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-chalk-dim">
                  {post.date}
                  <span className="inline-flex items-center gap-1">
                    <Clock size={11} /> {post.readTime}
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}
