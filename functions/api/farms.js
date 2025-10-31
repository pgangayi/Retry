// Cloudflare Pages Function for Farms API using D1
// Handles CRUD operations for farms using Cloudflare D1 database

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const method = request.method;

  try {
  // Validate JWT (Cloudflare D1)
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Verify and extract user from token
    const { AuthUtils } = await import('./_auth.js');
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
      // List farms for user using D1
      const query = `
        SELECT id, name, location, area_hectares, created_at
        FROM farms
        WHERE user_id = ?
        ORDER BY created_at DESC
      `;

      const { results: farms } = await env.DB.prepare(query)
        .bind(userId)
        .all();

      if (!farms) {
        return new Response(JSON.stringify({ error: 'Database error' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      return new Response(JSON.stringify(farms), {
        headers: { 'Content-Type': 'application/json' }
      });

    } else if (method === 'POST') {
      // Create farm
      const body = await request.json();
      const { name, location, area_hectares } = body;

      if (!name || !location) {
        return new Response(JSON.stringify({ error: 'Name and location required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Insert new farm
      const insertQuery = `
        INSERT INTO farms (user_id, name, location, area_hectares, created_at)
        VALUES (?, ?, ?, ?, datetime('now'))
      `;

      const result = await env.DB.prepare(insertQuery)
        .bind(userId, name, location, area_hectares || null)
        .run();

      if (!result.success) {
        return new Response(JSON.stringify({ error: 'Failed to create farm' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Get the created farm
      const newFarmId = result.meta.last_row_id;
      const selectQuery = `
        SELECT id, name, location, area_hectares, created_at
        FROM farms
        WHERE id = ?
      `;

      const { results: newFarm } = await env.DB.prepare(selectQuery)
        .bind(newFarmId)
        .all();

      return new Response(JSON.stringify(newFarm[0]), {
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
    console.error('Farm API error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}