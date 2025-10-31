# Farmers Boot - Farm Management Platform

## Overview

DELETED: README content removed as part of Supabase -> Cloudflare D1 migration.
Please check project docs in the internal wiki or Cloudflare Pages dashboard.

## Features


## Architecture

- **Frontend**: React + TypeScript, Vite build, PWA with service worker.
- **Backend**: Cloudflare Pages Functions with D1 database and R2 storage.
- **Database**: Cloudflare D1 (SQLite-compatible) with relational data structure.
- **Storage**: Cloudflare R2 for file storage and assets.
- **Deployment**: Cloudflare Pages (frontend) + Pages Functions (API).
- **Authentication**: Cloudflare-based JWT auth.

## Getting Started

### Prerequisites

- Node.js 18+
- Cloudflare account (for D1, R2, and Pages deployment)
- Wrangler CLI: `npm install -g wrangler`

### Local Development

#### Database Setup (D1)

1. Create local D1 database:
   ```bash
   npm run db:init
   ```

2. Run migrations:
   ```bash
   npm run db:migrate
   ```

3. (Optional) Seed database:
   ```bash
   npm run db:seed
   ```

#### Development Setup

1. Install dependencies:
   ```bash
   npm install
   cd frontend && npm install
   ```

2. Start development servers:
   ```bash
   # Terminal 1: Frontend + Functions
   npm run dev:local

   # Or separate terminals:
   # Terminal 1: Frontend only
   npm run dev

   # Terminal 2: Functions only
   npm run dev:functions
   ```

3. Visit: http://localhost:8788

#### Available Scripts

- `npm run dev:local` — Start frontend + functions locally
- `npm run dev:functions` — Start functions only
- `npm run db:init` — Create local D1 database
- `npm run db:migrate` — Run D1 migrations
- `npm run db:seed` — Seed database with sample data
- `npm run db:studio` — Check database tables

### Deployment

#### Local Development Deployment
- Use `npm run dev:local` for full local development with functions
- Uses `wrangler.toml` [env.local] configuration
- Connects to local D1 database

#### Production Deployment (Cloudflare Pages)

1. Create production D1 database:
   ```bash
   wrangler d1 create farmers-boot-prod
   ```

2. Update `wrangler.toml` with your production database IDs.

3. Connect GitHub repo to Cloudflare Pages.

4. Set build command: `npm run build` (output: `frontend/dist/`).

5. Set environment variables in Cloudflare Pages dashboard:
   - `VITE_MAPBOX_TOKEN`
   - `SENTRY_DSN` (optional)

6. Deploy; API endpoints available at `/api/*`.

#### Deployment Scripts

- `npm run deploy` — Deploy to Cloudflare Pages (Unix)
- `npm run deploy:windows` — Deploy to Cloudflare Pages (Windows)
- `npm run build:ci` — Build with dummy env vars for CI testing

### Database Schema

The application uses the following main tables in D1:

- `users` — User accounts
- `farms` — Farm information
- `farm_members` — User roles per farm
- `animals` — Livestock records
- `fields` — Field/crop management
- `tasks` — Work assignments
- `inventory` — Stock items
- `finance_entries` — Income/expense tracking
- `treatments` — Animal treatment records

See `schema.sql` for the complete database schema.

### API Usage

Example: Apply treatment

```bash
curl -X POST https://your-site.pages.dev/api/operations/apply-treatment \
  -H "Authorization: Bearer <user-jwt>" \
  -H "Idempotency-Key: <uuid>" \
  -H "Content-Type: application/json" \
  -d '{
    "farmId": "farm-uuid",
    "targetType": "livestock",
    "targetId": "animal-uuid",
    "appliedAt": "2025-10-30T12:00:00Z",
    "items": [{"inventoryItemId": "item-uuid", "qty": 2, "unit": "bottle"}]
  }'
```

## Project Structure

- `frontend/` — React app
- `functions/api/` — Cloudflare Pages Functions (D1-based)
- `schema.sql` — D1 database schema
- `wrangler.toml` — Cloudflare configuration
- `.github/workflows/ci.yml` — CI pipeline

## Contributing

- Run tests before committing.
- Use the PR template for changes.
- Follow the phase plan in `build.md`.

## License

MIT