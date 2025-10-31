// Cloudflare Pages Function for Fields API using D1
// Handles CRUD operations for fields using Cloudflare D1 database

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
      // List fields for user's farms using D1
      const query = `
        SELECT
          f.id, f.name, f.area_hectares, f.crop_type, f.notes, f.created_at,
          fm.name as farm_name
        FROM fields f
        JOIN farms fm ON f.farm_id = fm.id
        JOIN farm_members fmem ON fm.id = fmem.farm_id
        WHERE fmem.user_id = ?
        ORDER BY f.created_at DESC
      `;

      const { results: fields } = await env.DB.prepare(query)
        .bind(userId)
        .all();

      if (!fields) {
        return new Response(JSON.stringify({ error: 'Database error' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      return new Response(JSON.stringify(fields), {
        headers: { 'Content-Type': 'application/json' }
      });

    } else if (method === 'POST') {
      // Create field
      const body = await request.json();
      const { farm_id, name, area_hectares, crop_type, notes } = body;

      if (!farm_id || !name) {
        return new Response(JSON.stringify({ error: 'Farm ID and name required' }), {
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

      // Insert new field
      const insertQuery = `
        INSERT INTO fields (farm_id, name, area_hectares, crop_type, notes, created_at)
        VALUES (?, ?, ?, ?, ?, datetime('now'))
      `;

      const result = await env.DB.prepare(insertQuery)
        .bind(farm_id, name, area_hectares || null, crop_type || null, notes || null)
        .run();

      if (!result.success) {
        return new Response(JSON.stringify({ error: 'Failed to create field' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Get the created field
      const newFieldId = result.meta.last_row_id;
      const selectQuery = `
        SELECT
          f.id, f.name, f.area_hectares, f.crop_type, f.notes, f.created_at,
          fm.name as farm_name
        FROM fields f
        JOIN farms fm ON f.farm_id = fm.id
        WHERE f.id = ?
      `;

      const { results: newField } = await env.DB.prepare(selectQuery)
        .bind(newFieldId)
        .all();

      return new Response(JSON.stringify(newField[0]), {
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
    console.error('Fields API error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}