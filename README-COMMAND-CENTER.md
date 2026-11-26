# LazyXTech Command Center

The existing public website remains at the repository root. The repository is now organized as a monorepo-style workspace:

- apps/dashboard — internal Next.js SEO dashboard
- services/backend — Fastify API, MongoDB models, crawler and auth
- services/backend/src/worker.ts — persistent cron worker
- docker-compose.yml — local full-stack orchestration

## Database

MongoDB Atlas is the database target. The existing Render API service can host the optional inline scheduler without creating another paid service.

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
- The free Render web service may sleep during inactivity; scheduled jobs only execute while its process is awake. The optional GitHub Actions workflow can provide an independent daily run after its MongoDB secret is configured.
- Google OAuth, Search Console, GA4, PageSpeed and email credentials must be configured before those integrations can return live data.
- The current branch is an implementation foundation, not a claim that every requested production integration is already complete.

## Existing deployment

Keep the existing Render API service and MongoDB Atlas. Merge this tested branch to main to deploy the dashboard/backend changes; then set ENABLE_INLINE_WORKER=true on the active lazyxtech-api service.

## Scheduled monitoring (GitHub Actions)

The repository includes `.github/workflows/lazyxtech-monitoring.yml`. After merging it to `main`, GitHub Actions runs the monitoring job daily at 02:30 UTC and supports manual runs from the Actions tab.

Configure these repository Actions secrets before enabling the workflow:

- `MONGODB_URI` — the same MongoDB Atlas connection string used by the Render API.
- `GOOGLE_SERVICE_ACCOUNT_JSON` — optional service-account JSON. Add its email as a user on the verified Search Console property.
- `OLLAMA_BASE_URL` — optional reachable Ollama endpoint. GitHub-hosted runners cannot access Ollama on your personal computer via localhost; use a reachable private-network tunnel or hosted Ollama endpoint if scheduled AI drafts are desired.

`GSC_PROPERTY_URL` defaults to `https://lazyxtech.com/`. Change the workflow environment if your Search Console property uses a domain property or a different canonical host.

The job performs a bounded same-origin crawl (up to 20 pages), records a technical audit and notifications, checks Search Console when credentials are present, and creates AI blog drafts only when Ollama is reachable. Drafts are never published automatically.

## Current free-tier deployment behaviour

The active dashboard API is the existing Render service `lazyxtech-api` (free web service). The optional in-process scheduler starts when `ENABLE_INLINE_WORKER=true` is set on that API service. It records a heartbeat every minute and runs the technical crawl, Search Console sync, weekly competitor check and three-day AI draft task. No separate paid Render worker or cron service is created.

**Free-tier limitation:** Render free web services can spin down after inactivity. The in-process scheduler cannot execute while the service is asleep; the dashboard/API request wakes it again. For reliable daily monitoring while the service is asleep, the optional GitHub Actions workflow can run independently after `MONGODB_URI` is added as a repository Actions secret. That workflow is configured to skip its job step when the secret is absent.

## Integrations and ranking

- Google Search Console service-account JSON and the exact verified `GSC_PROPERTY_URL` are required for real clicks, impressions, CTR, average position, queries and ranking opportunities.
- Enable the Google PageSpeed Insights API in Google Cloud and set its free API key as `PAGESPEED_API_KEY` in Render to run Lighthouse checks.
- Ollama is free/open-source, but a hosted Render API cannot reach Ollama running on a developer laptop through `localhost`. Set `OLLAMA_BASE_URL` to a reachable Ollama endpoint if scheduled cloud drafts are required. No paid LLM API is required.
- Competitor monitoring checks public website reachability and metadata only; it does not claim to provide competitor Google keyword rankings or backlink data.
- Blog generation creates review-only drafts. The public website's CMS/publishing integration is not yet configured, so approval does not publish a post live.
- No tool can guarantee Google ranking positions. The dashboard surfaces verified Search Console opportunities and technical fixes to support SEO work.
