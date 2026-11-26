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

## Scheduled monitoring (GitHub Actions)

The repository includes `.github/workflows/lazyxtech-monitoring.yml`. After merging it to `main`, GitHub Actions runs the monitoring job daily at 02:30 UTC and supports manual runs from the Actions tab.

Configure these repository Actions secrets before enabling the workflow:

- `MONGODB_URI` — the same MongoDB Atlas connection string used by the Render API.
- `GOOGLE_SERVICE_ACCOUNT_JSON` — optional service-account JSON. Add its email as a user on the verified Search Console property.
- `OLLAMA_BASE_URL` — optional reachable Ollama endpoint. GitHub-hosted runners cannot access Ollama on your personal computer via localhost; use a reachable private-network tunnel or hosted Ollama endpoint if scheduled AI drafts are desired.

`GSC_PROPERTY_URL` defaults to `https://lazyxtech.com/`. Change the workflow environment if your Search Console property uses a domain property or a different canonical host.

The job performs a bounded same-origin crawl (up to 20 pages), records a technical audit and notifications, checks Search Console when credentials are present, and creates AI blog drafts only when Ollama is reachable. Drafts are never published automatically.
