// Cloudflare Pages Function for Finance Entries API using D1
// Handles CRUD operations for financial entries using Cloudflare D1 database

export async function onRequest(context) {
  const { request, env } = context;
  const method = request.method;

  try {
    // Validate JWT (using Supabase for auth, D1 for data)
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Verify and extract user from token
    const { AuthUtils } = await import('../_auth.js');
    const auth = new AuthUtils(env);
    const user = await auth.getUserFromToken(request);
    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    const userId = user.id;

    if (method === 'GET') {
      // List finance entries for user's farms using D1
      const query = `
        SELECT
          fe.id, fe.type, fe.amount, fe.description, fe.date, fe.category,
          f.name as farm_name
        FROM finance_entries fe
        JOIN farms f ON fe.farm_id = f.id
        JOIN farm_members fm ON f.id = fm.farm_id
        WHERE fm.user_id = ?
        ORDER BY fe.date DESC
      `;

      const { results: entries } = await env.DB.prepare(query)
        .bind(userId)
        .all();

      if (!entries) {
        return new Response(JSON.stringify({ error: 'Database error' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      return new Response(JSON.stringify(entries), {
        headers: { 'Content-Type': 'application/json' }
      });

    } else if (method === 'POST') {
      // Create finance entry
      const body = await request.json();
      const { farm_id, type, amount, description, date, category } = body;

      if (!farm_id || !type || !amount || !description) {
        return new Response(JSON.stringify({ error: 'Farm ID, type, amount and description required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Verify user has access to farm
      const accessQuery = `
        SELECT id FROM farm_members
        WHERE farm_id = ? AND user_id = ?
      `;
      const { results: farmAccess } = await env.DB.prepare(accessQuery)
        .bind(farm_id, userId)
        .all();

      if (!farmAccess || farmAccess.length === 0) {
        return new Response(JSON.stringify({ error: 'Access denied' }), {
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Insert new finance entry
      const insertQuery = `
        INSERT INTO finance_entries (farm_id, type, amount, description, date, category, created_by, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))
      `;

      const result = await env.DB.prepare(insertQuery)
        .bind(farm_id, type, amount, description, date || new Date().toISOString(), category || 'General', userId)
        .run();

      if (!result.success) {
        return new Response(JSON.stringify({ error: 'Failed to create finance entry' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Get the created entry
      const newEntryId = result.meta.last_row_id;
      const selectQuery = `
        SELECT
          fe.id, fe.type, fe.amount, fe.description, fe.date, fe.category,
          f.name as farm_name
        FROM finance_entries fe
        JOIN farms f ON fe.farm_id = f.id
        WHERE fe.id = ?
      `;

      const { results: newEntry } = await env.DB.prepare(selectQuery)
        .bind(newEntryId)
        .all();

      return new Response(JSON.stringify(newEntry[0]), {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
      });

    } else {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' }
      });
    }

  } catch (error) {
    console.error('Finance entries API error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}