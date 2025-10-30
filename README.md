# Farmers Boot - Farm Management Platform

## Overview

Farmers Boot is a progressive web application (PWA) designed for small-to-medium farmers to manage farms, fields, livestock, tasks, inventory, and users. Built with React + TypeScript (Vite frontend), Supabase (backend/database), and Cloudflare Pages + Functions for deployment.

## Features

- **Farm Management**: Create and manage multiple farms with user roles (owner, manager, worker).
- **Fields & Livestock**: Track fields, animals, health records, and treatments.
- **Inventory & Finance**: Manage inventory items, transactions, and basic finance entries.
- **Tasks**: Assign and track tasks across fields and animals.
- **Offline Support**: PWA with service worker for offline viewing and queued operations.
- **API**: Serverless endpoints for CRUD operations, with transactional treatment application.

## Architecture

- **Frontend**: React + TypeScript, Vite build, PWA with service worker.
- **Backend**: Supabase (Postgres + Auth + Storage + Realtime).
- **Deployment**: Cloudflare Pages (frontend) + Pages Functions (API).
- **Database**: Postgres with PostGIS for spatial data, RLS policies for security.

## Getting Started

### Prerequisites

- Node.js 18+
- Supabase account and project
- Cloudflare account (for deployment)

### Local Development

#### Option 1: Quick Setup (Recommended)

1. Run the automated setup:
   ```powershell
   # Windows
   npm run setup:local:windows
   
   # Unix/Linux/macOS
   npm run setup:local:unix
   ```

2. Edit `.env` with your local Supabase values (uncomment the local section).

3. Start development:
   ```powershell
   npm run dev:local  # Runs both frontend and functions locally
   ```

#### Option 2: Manual Setup

1. Install Supabase CLI:
   ```powershell
   npm install -g supabase
   ```

2. Start local Supabase:
   ```powershell
   supabase start
   ```

3. Copy and configure environment:
   ```powershell
   cp .env.example .env
   # Edit .env with local values
   ```

4. Run migrations:
   ```powershell
   supabase db reset
   ```

5. Start development servers:
   ```powershell
   # Terminal 1: Frontend + Functions
   npm run dev:local
   
   # Or separate terminals:
   # Terminal 1: Frontend only
   npm run dev
   
   # Terminal 2: Functions only
   npm run dev:functions
   ```

6. Visit: http://localhost:8788

#### Available Scripts

- `npm run dev:local` — Start frontend + functions locally
- `npm run dev:functions` — Start functions only
- `npm run setup:local:windows` — Windows setup script
- `npm run setup:local:unix` — Unix setup script

### Deployment

#### Local Development Deployment
- Use `npm run dev:local` for full local development with functions
- Uses `wrangler.toml` [env.local] configuration
- Connects to local Supabase instance

#### Production Deployment (Cloudflare Pages)

1. Connect GitHub repo to Cloudflare Pages.
2. Set build command: `npm run build` (output: `frontend/dist/`).
3. Set environment variables in Cloudflare Pages dashboard:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_MAPBOX_TOKEN`
   - `SENTRY_DSN` (optional)
4. Deploy; API endpoints available at `/api/*`.

#### Deployment Scripts

- `npm run deploy` — Deploy to Cloudflare Pages (Unix)
- `npm run deploy:windows` — Deploy to Cloudflare Pages (Windows)
- `npm run build:ci` — Build with dummy env vars for CI testing

### API Usage

Example: Apply treatment

```powershell
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
- `functions/api/` — Cloudflare Pages Functions
- `supabase/migrations/` — DB migrations
- `migrations/` — Original migration files
- `.github/workflows/ci.yml` — CI pipeline

## Contributing

- Run tests before committing.
- Use the PR template for changes.
- Follow the phase plan in `build.md`.

## License

MIT