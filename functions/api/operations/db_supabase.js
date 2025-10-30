// Cloudflare-compatible database client using Supabase JS client
// This replaces db_pg.js for Cloudflare Functions runtime

import { createClient } from '@supabase/supabase-js';

function createSupabaseClient(url, serviceRoleKey) {
  const supabase = createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  return {
    // Basic query method that mimics pg client interface
    query: async (text, params = []) => {
      // For simple SELECT queries, we can use Supabase's RPC or direct table access
      // This is a simplified implementation - complex queries may need RPC functions
      if (text.toLowerCase().includes('select')) {
        // Extract table name from query (very basic parsing)
        const tableMatch = text.match(/from\s+(\w+)/i);
        if (tableMatch) {
          const table = tableMatch[1];
          const result = await supabase.from(table).select('*');
          return {
            rows: result.data || [],
            rowCount: result.data?.length || 0
          };
        }
      }

      // For complex queries, we'd need to use RPC functions
      // For now, throw an error to indicate this needs to be implemented
      throw new Error(`Complex query not supported in Cloudflare runtime: ${text}`);
    },

    // Transaction methods (simplified - Supabase handles transactions differently)
    begin: async () => { /* Supabase handles transactions at RPC level */ },
    commit: async () => { /* Supabase handles transactions at RPC level */ },
    rollback: async () => { /* Supabase handles transactions at RPC level */ },

    // Connection methods (no-op for Supabase)
    connect: async () => {},
    end: async () => {}
  };
}

export function getDbClient(env) {
  const SUPABASE_URL = env.SUPABASE_URL;
  const SERVICE_ROLE = env.SUPABASE_SERVICE_ROLE_KEY;

  if (!SUPABASE_URL || !SERVICE_ROLE) {
    throw new Error('Missing Supabase credentials in environment');
  }

  return createSupabaseClient(SUPABASE_URL, SERVICE_ROLE);
}