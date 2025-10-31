-- POSTGRES-ONLY MIGRATION (archived)
-- NOTE: This migration defines audit log and operations tables with RLS
-- policies that depend on Supabase/Postgres `auth.uid()` helper. Cloudflare
-- D1 does not support RLS or `auth.uid()`. For D1, implement access control in
-- application code and use the D1-compatible `schema.sql` for schema creation.

-- Original filename: 0005_audit_logs_and_operations.sql