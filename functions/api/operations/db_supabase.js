// Cloudflare-compatible database client using D1
// This replaces db_pg.js for Cloudflare Functions runtime

function createD1Client(db) {
  return {
    // Basic query method that mimics pg client interface
    query: async (text, params = []) => {
      // For D1, we need to convert SQL queries to D1 format
      // This is a simplified implementation - complex queries may need adjustments
      try {
        const stmt = db.prepare(text);
        if (params && params.length > 0) {
          // Bind parameters if provided
          for (let i = 0; i < params.length; i++) {
            stmt.bind(params[i], i);
          }
        }

        const result = await stmt.all();
        return {
          rows: result.results || [],
          rowCount: result.results?.length || 0
        };
      } catch (error) {
        throw new Error(`D1 query failed: ${error.message}`);
      }
    },

    // Transaction methods for D1
    begin: async () => {
      // D1 handles transactions differently - we'll use batch operations
      return db.batch([]);
    },

    commit: async (batch) => {
      if (batch) {
        await batch.run();
      }
    },

    rollback: async () => {
      // D1 doesn't support rollbacks in the same way - this is a no-op
    },

    // Connection methods (no-op for D1)
    connect: async () => {},
    end: async () => {}
  };
}

export function getDbClient(env) {
  const db = env.DB;

  if (!db) {
    throw new Error('Missing D1 database binding in environment');
  }

  return createD1Client(db);
}