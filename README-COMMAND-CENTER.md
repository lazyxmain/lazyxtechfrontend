# LazyXTech Command Center

The existing public website remains at the repository root. The repository is now organized as a monorepo-style workspace:

- apps/dashboard — internal Next.js SEO dashboard
- services/backend — Fastify API, MongoDB models, crawler and auth
- services/backend/src/worker.ts — persistent cron worker
- docker-compose.yml — local full-stack orchestration

## Database

MongoDB Atlas is the database target. Render is not required for MongoDB or workers.

## Local setup

1. Copy services/backend/.env.example to services/backend/.env.
2. Set MONGODB_URI and a JWT_SECRET of at least 32 characters.
3. Install dependencies in apps/dashboard and services/backend.
4. Run backend with npm run dev.
5. Run dashboard with npm run dev.
6. Run worker with npm run worker.

Or use Docker Compose after creating services/backend/.env.

## Important production notes

- The dashboard never fabricates Search Console or Analytics numbers.
- SEO score is deterministic from recorded audit rules.
- AI is optional; Ollama is the intended local provider.
- Free hosting platforms may sleep or terminate workers. For reliable scheduled execution, run the worker in Docker on a machine that stays online.
- Google OAuth, Search Console, GA4, PageSpeed and email credentials must be configured before those integrations can return live data.
- The current branch is an implementation foundation, not a claim that every requested production integration is already complete.

## Existing deployment

Do not delete the current live Render setup yet. First validate this branch locally and then switch deployment deliberately. MongoDB Atlas can remain external.
