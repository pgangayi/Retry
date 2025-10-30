Migrations — Phase 1
=====================

These SQL files are intended as canonical migrations you can run against a Supabase/Postgres database.

Files
- `0001_enable_postgis.sql` — enables `postgis` and `pgcrypto` extensions.
- `0002_core_inventory_finance.sql` — creates `farms`, `farm_members`, `inventory_items`, `inventory_transactions`, `finance_entries`, and `treatments` tables and indexes.
- `0003_operations_idempotency_and_rls.sql` — creates `operations` table and example RLS policy statements for `inventory_items`, `inventory_transactions`, and `finance_entries`.

How to run (recommended: test/staging first)

Using `psql`:

```powershell
# example: run 0001.. in order
powershell -Command "psql $env:SUPABASE_DB_URL -f migrations/0001_enable_postgis.sql"
powershell -Command "psql $env:SUPABASE_DB_URL -f migrations/0002_core_inventory_finance.sql"
powershell -Command "psql $env:SUPABASE_DB_URL -f migrations/0003_operations_idempotency_and_rls.sql"
```

Using the Supabase CLI (recommended for Supabase projects):

```powershell
# ensure SUPABASE_DB_URL or supabase CLI is configured
supabase db query < migrations/0001_enable_postgis.sql
supabase db query < migrations/0002_core_inventory_finance.sql
supabase db query < migrations/0003_operations_idempotency_and_rls.sql
```

Notes & cautions
- The RLS policy statements are examples. Tailor them to your exact schema and test them carefully. Enabling RLS without appropriate policies can lock out access.
- In production, add transactional migration tooling (pg-migrate, Flyway, Prisma Migrate, or Supabase migrations) and keep a migration history table.
- The migrations assume `auth.uid()` is available (Supabase Auth). If you run these against a plain Postgres that doesn't provide `auth.uid()`, either create a stub or adapt the policies.

Next steps (Phase 1 acceptance)
- Run the migrations against a test DB and verify tables and indexes are created.
- Confirm PostGIS works: `SELECT PostGIS_Version();` and test a sample geometry insertion.
- Add integration tests that use a test Postgres (Docker) to validate transactions (Phase 3 will depend on this).
