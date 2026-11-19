export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  body: { heading: string; text: string }[];
}

export const POSTS: Post[] = [
  {
    slug: 'choosing-the-right-stack-for-your-first-saas',
    title: 'Choosing the Right Stack for Your First SaaS',
    excerpt:
      'Tech debates get loud. Here is the calm version: how React, TypeScript, Node.js and a relational database cover most first-SaaS needs without over-engineering.',
    date: 'November 2026',
    readTime: '5 min read',
    category: 'Engineering',
    body: [
      {
        heading: 'Start with what the product must do',
        text: 'A SaaS product is a set of workflows: sign up, do a task, see results, pay. Most early failures come from choosing exotic tools for problems the product does not have yet. A proven stack — React and TypeScript on the front, Node.js on the back, a relational database underneath — lets you move fast and hire easily.',
      },
      {
        heading: 'Frontend: React and TypeScript',
        text: 'React remains the safest bet for interactive products: the ecosystem, hiring pool and tooling are unmatched. Pair it with TypeScript from day one. Types are documentation that never goes stale, and they catch whole categories of bugs before your users do.',
      },
      {
        heading: 'Backend: Node.js and Fastify',
        text: 'For a first SaaS, a single language across the stack removes an entire class of context-switching. Fastify gives you a fast, schema-friendly API layer with less ceremony than heavier frameworks. When you need queues, caching with Redis, or scheduled jobs, the same ecosystem grows with you.',
      },
      {
        heading: 'Database: pick boring, stay relational',
        text: 'Relational databases (MySQL, Postgres) handle the vast majority of SaaS data models well. Reach for document stores like MongoDB when your data is genuinely shape-shifting, and add Redis when read volume demands it — not before.',
      },
      {
        heading: 'The takeaway',
        text: 'Your stack is a hiring decision and a speed decision, not a fashion decision. Choose tools with large communities, ship the product, and let real usage — not blog posts — drive your architecture.',
      },
    ],
  },
  {
    slug: 'why-website-speed-is-a-business-metric',
    title: 'Why Website Speed Is a Business Metric, Not a Technical One',
    excerpt:
      'Every 100ms of load time is felt in conversions. A practical look at performance budgets, lazy loading and why "fast" is a feature you sell.',
    date: 'November 2026',
    readTime: '4 min read',
    category: 'Performance',
    body: [
      {
        heading: 'Speed is felt before it is measured',
        text: 'Visitors judge your business within seconds. A slow site reads as an unprofessional company, regardless of how good the product actually is. Speed is brand.',
      },
      {
        heading: 'Budget like a finance team',
        text: 'High-performing teams set a performance budget: a hard cap on page weight and load time. Images get lazy-loaded, 3D and video load on demand, and JavaScript is measured per feature. When a new feature wants to exceed the budget, something else must pay for it.',
      },
      {
        heading: 'The 3D exception that proves the rule',
        text: 'Heavy visuals can coexist with speed if they load progressively and stay off the critical path. The trick is that content arrives first, effects arrive after, and everything below the fold loads only when the visitor approaches it.',
      },
      {
        heading: 'Measure what users feel',
        text: 'Lab scores are useful, but the metrics that correlate with revenue are field metrics: how quickly the largest content appears, and how fast the page reacts to a tap. Optimize those two and the score follows.',
      },
    ],
  },
  {
    slug: 'the-case-for-strategy-before-code',
    title: 'The Case for Strategy Before Code',
    excerpt:
      'The most expensive bugs are written in the first week — when nobody has asked the boring questions yet. What a strategy-first process actually looks like.',
    date: 'October 2026',
    readTime: '4 min read',
    category: 'Process',
    body: [
      {
        heading: 'Cheap questions, expensive answers',
        text: 'Rewriting a feature after launch costs multiples of building it right the first time. Most of that rework traces back to questions nobody asked: who exactly is this for, what action pays the bills, what can wait until version two.',
      },
      {
        heading: 'What discovery actually produces',
        text: 'A serious discovery phase produces unglamorous artifacts: a prioritized scope, a written definition of done, and a roadmap that admits what is unknown. Those documents are what make the build phase fast.',
      },
      {
        heading: 'Strategy is continuous, not a phase',
        text: 'Good teams do not finish strategy and start building; they keep re-prioritizing as they learn. The roadmap is a living document, and the weekly demo — not the specification — is where alignment happens.',
      },
      {
        heading: 'How to spot a strategy-first partner',
        text: 'They ask about your business model before your color palette. They write things down. They will happily tell you that a feature you asked for should not be built yet. That last one is worth paying for.',
      },
    ],
  },
];

export function getPost(slug: string | undefined): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}
