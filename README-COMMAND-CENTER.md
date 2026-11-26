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
- AI blog drafts support Google Gemini API free tier (with an owner-provided key) or self-hosted Ollama.
- The free Render web service may sleep during inactivity; scheduled jobs only execute while its process is awake. The optional GitHub Actions workflow can provide an independent daily run after its MongoDB secret is configured.
- Google OAuth, Search Console, GA4, PageSpeed and email credentials must be configured before those integrations can return live data.
- Public blog pages are generated from approved dashboard articles; review is required before publication.

## Existing deployment

Keep the existing Render API service and MongoDB Atlas. Merge this tested branch to main to deploy the dashboard/backend changes; then set ENABLE_INLINE_WORKER=true on the active lazyxtech-api service.

## Scheduled monitoring (GitHub Actions)

The repository includes `.github/workflows/lazyxtech-monitoring.yml`. After merging it to `main`, GitHub Actions runs the monitoring job daily at 02:30 UTC and supports manual runs from the Actions tab.

Configure these repository Actions secrets before enabling the workflow:

- `MONGODB_URI` — the same MongoDB Atlas connection string used by the Render API.
- `GOOGLE_SERVICE_ACCOUNT_JSON` — optional service-account JSON. Add its email as a user on the verified Search Console property.
- `GEMINI_API_KEY` — optional Google AI Studio free-tier key for hosted AI article drafts.\n- `OLLAMA_BASE_URL` — optional reachable Ollama endpoint. GitHub-hosted runners cannot access Ollama on your personal computer via localhost.

`GSC_PROPERTY_URL` defaults to `https://lazyxtech.com/`. Change the workflow environment if your Search Console property uses a domain property or a different canonical host.

The job performs a bounded same-origin crawl (up to 20 pages), records a technical audit and notifications, checks Search Console when credentials are present, and creates AI blog drafts when Gemini or a reachable Ollama provider is configured. Drafts are never published automatically.

## Current free-tier deployment behaviour

The active dashboard API is the existing Render service `lazyxtech-api` (free web service). The optional in-process scheduler starts when `ENABLE_INLINE_WORKER=true` is set on that API service. It records a heartbeat every minute and runs the technical crawl, Search Console sync, weekly competitor check and three-day AI draft task. No separate paid Render worker or cron service is created.

**Free-tier limitation:** Render free web services can spin down after inactivity. The in-process scheduler cannot execute while the service is asleep; the dashboard/API request wakes it again. For reliable daily monitoring while the service is asleep, the optional GitHub Actions workflow can run independently after `MONGODB_URI` is added as a repository Actions secret. That workflow is configured to skip its job step when the secret is absent.

## Integrations and ranking

- Google Search Console service-account JSON and the exact verified `GSC_PROPERTY_URL` are required for real clicks, impressions, CTR, average position, queries and ranking opportunities.
- Enable the Google PageSpeed Insights API in Google Cloud and set its free API key as `PAGESPEED_API_KEY` in Render to run Lighthouse checks.
- Google AI Studio offers a free-tier Gemini API; set `GEMINI_API_KEY` and optionally `GEMINI_MODEL=gemini-2.5-flash` on Render to enable hosted drafts without a paid LLM plan. Ollama is also free/open-source, but a hosted Render API cannot reach Ollama running on a developer laptop through `localhost`.
- Competitor monitoring checks public website reachability and metadata only; it does not claim to provide competitor Google keyword rankings or backlink data.
- Blog generation creates review-only drafts. Approving a draft exposes it at `/blog` and `/blog/[slug]` on the public website, and the sitemap includes approved articles.
- No tool can guarantee Google ranking positions. The dashboard surfaces verified Search Console opportunities and technical fixes to support SEO work.
