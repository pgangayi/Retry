// Cloudflare Pages Function for Inventory API using D1
// Handles CRUD operations for inventory items using Cloudflare D1 database

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
      // List inventory items for user's farms using D1
      const query = `
        SELECT
          i.id, i.name, i.category, i.quantity, i.unit, i.min_stock_level,
          i.current_stock_level, i.location, i.expiry_date, i.created_at
        FROM inventory i
        JOIN farms f ON i.farm_id = f.id
        JOIN farm_members fm ON f.id = fm.farm_id
        WHERE fm.user_id = ?
        ORDER BY i.created_at DESC
      `;

      const { results: inventory } = await env.DB.prepare(query)
        .bind(userId)
        .all();

      if (!inventory) {
        return new Response(JSON.stringify({ error: 'Database error' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      return new Response(JSON.stringify(inventory), {
        headers: { 'Content-Type': 'application/json' }
      });

    } else if (method === 'POST') {
      // Create inventory item
      const body = await request.json();
      const { farm_id, name, category, quantity, unit, min_stock_level, location, expiry_date } = body;

      if (!farm_id || !name || !category) {
        return new Response(JSON.stringify({ error: 'Farm ID, name and category required' }), {
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

      // Insert new inventory item
      const insertQuery = `
        INSERT INTO inventory (farm_id, name, category, quantity, unit, min_stock_level, current_stock_level, location, expiry_date, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
      `;

      const result = await env.DB.prepare(insertQuery)
        .bind(
          farm_id,
          name,
          category,
          quantity || 0,
          unit || 'units',
          min_stock_level || 10,
          quantity || 0,
          location || null,
          expiry_date || null
        )
        .run();

      if (!result.success) {
        return new Response(JSON.stringify({ error: 'Failed to create inventory item' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Get the created item
      const newItemId = result.meta.last_row_id;
      const selectQuery = `
        SELECT id, name, category, quantity, unit, min_stock_level, current_stock_level, location, expiry_date, created_at
        FROM inventory
        WHERE id = ?
      `;

      const { results: newItem } = await env.DB.prepare(selectQuery)
        .bind(newItemId)
        .all();

      return new Response(JSON.stringify(newItem[0]), {
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
    console.error('Inventory API error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}