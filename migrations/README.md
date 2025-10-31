Migrations — Phase 1
=====================

These migration files are archived Postgres/Supabase migrations and are NOT D1-compatible.

Why: the repository now targets Cloudflare D1 (a SQLite-like engine) and the
previous migrations include Postgres-only features such as:
- PostGIS extensions and spatial types
- UUID functions and jsonb/timestamptz datatypes
- PL/pgSQL stored procedures
- Row-Level Security (RLS) policies that rely on `auth.uid()`

What to use for Cloudflare D1
- The D1-compatible schema is in `schema.sql` at the repository root. Use
	`wrangler d1 execute <your-db-binding> --file=schema.sql` to apply the schema.

If you still maintain a Postgres deployment
- Keep Postgres/Supabase migrations in a separate archive or repository. Do
	not run the Postgres migration files against D1.

Notes on access control
- Cloudflare D1 does not provide `auth.uid()` or RLS. Implement authorization
	checks in your Cloudflare Functions (validate JWT, then use parameterized
	queries that filter by user id / farm membership).

Contact
- If you want, I can produce D1-compatible migration snippets or a
	lightweight migration runner that applies `schema.sql` to a D1 database.
