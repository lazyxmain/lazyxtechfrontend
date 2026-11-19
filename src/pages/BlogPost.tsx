import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Clock } from 'lucide-react';
import { Reveal } from '../components/motion';
import { getPost, POSTS } from '../content/posts';
import { useSEO } from '../lib/seo';

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPost(slug);

  useSEO({
    title: post ? `${post.title} — LazyXTech Blog` : 'Article — LazyXTech Blog',
    description: post?.excerpt ?? 'LazyXTech blog.',
    path: `/blog/${slug ?? ''}`,
    type: 'article',
  });

  if (!post) {
    return (
      <main className="flex min-h-[70svh] flex-col items-center justify-center px-6 pt-36 text-center">
        <h1 className="font-display text-4xl font-semibold text-chalk">Article not found</h1>
        <p className="mt-4 text-chalk-dim">This article may have been moved or removed.</p>
        <Link
          to="/blog"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-lime-electric px-6 py-3 font-display text-sm font-semibold text-ink"
        >
          Back to Blog
        </Link>
      </main>
    );
  }

  const others = POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <main className="relative overflow-hidden pb-28 pt-36 md:pt-44">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[380px] w-[700px] -translate-x-1/2 rounded-full bg-voltage/[0.06] blur-[150px]"
      />
      <article className="relative mx-auto max-w-3xl px-6 md:px-10">
        <Reveal>
          <Link
            to="/blog"
            className="group mb-8 inline-flex items-center gap-2 text-sm text-chalk-dim transition-colors hover:text-lime-electric"
          >
            <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-0.5" />
            All articles
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-lime-electric">
              {post.category}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-chalk-dim">
              {post.date}
            </span>
            <span className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.18em] text-chalk-dim">
              <Clock size={11} /> {post.readTime}
            </span>
          </div>
          <h1 className="mt-6 font-display text-3xl font-semibold leading-tight tracking-tight text-chalk md:text-5xl">
            {post.title}
          </h1>
        </Reveal>

        <div className="mt-12 space-y-9">
          {post.body.map((section, i) => (
            <Reveal key={i} delay={0.05 * i}>
              <h2 className="font-display text-xl font-semibold text-chalk md:text-2xl">
                {section.heading}
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-chalk-dim md:text-base">
                {section.text}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-16 rounded-3xl border border-line bg-ink-card p-8 md:p-10">
            <h2 className="font-display text-2xl font-semibold text-chalk">
              Building something like this?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-chalk-dim">
              We help ambitious teams turn ideas into fast, scalable digital products.
            </p>
            <Link
              to="/#contact"
              className="group mt-6 inline-flex items-center gap-2 rounded-full bg-lime-electric px-6 py-3 font-display text-sm font-semibold text-ink transition-transform duration-300 hover:scale-[1.03]"
            >
              Start a Project
              <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </Reveal>

        {/* More articles */}
        <div className="mt-16">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.25em] text-chalk-dim">
            More reading
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {others.map((p) => (
              <Link
                key={p.slug}
                to={`/blog/${p.slug}`}
                className="group rounded-2xl border border-line bg-ink-soft p-6 transition-colors duration-300 hover:border-lime-electric/40"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-lime-electric">
                  {p.category}
                </span>
                <h3 className="mt-3 font-display text-base font-semibold leading-snug text-chalk">
                  {p.title}
                </h3>
                <span className="mt-3 inline-flex items-center gap-1 text-xs text-chalk-dim transition-colors group-hover:text-lime-electric">
                  Read <ArrowUpRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </main>
  );
}
