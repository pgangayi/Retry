# Phase 0 — Repo & CI notes

This repository was updated to include Phase 0 artifacts for the Farmers Boot project.

Files added:
- `.env.example` — placeholders for Supabase, Mapbox, Cloudflare, and notes about secrets.
- `.github/workflows/ci.yml` — minimal CI workflow that installs dependencies and runs lints/tests when present.

What to do next locally:
1. Copy `.env.example` to `.env` and fill in values needed for local dev (if you have a dev DB).
2. If running tests locally, install dependencies with `npm ci` in the relevant packages (frontend/backend) and run `npm run test`.

Notes:
- Do not commit your real secrets. Use repository or deployment platform secrets (Cloudflare/GitHub Actions secrets).
- If you prefer a different CI job set (e.g., run frontend/backend separately), we can expand the workflow into multiple jobs.
