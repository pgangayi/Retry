// Cloudflare Pages Function for Low Stock Inventory API using D1
// Returns inventory items that are below minimum stock levels

export async function onRequest(context) {
  const { request, env } = context;

  try {
    // Validate JWT (using Supabase for auth, D1 for data)
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // For now, we'll use a simple user ID extraction from JWT
    // In production, you'd want proper JWT validation and user extraction
    const token = authHeader.substring(7);
    // TODO: Implement proper JWT validation and user extraction
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

    // Get low stock items for user's farms using D1
    const query = `
      SELECT
        i.id, i.name, i.current_stock_level as current_stock,
        i.min_stock_level, i.unit,
        CASE
          WHEN i.current_stock_level <= i.min_stock_level THEN 'low_stock'
          WHEN i.current_stock_level <= i.min_stock_level * 1.5 THEN 'warning'
          ELSE 'normal'
        END as status
      FROM inventory i
      JOIN farms f ON i.farm_id = f.id
      JOIN farm_members fm ON f.id = fm.farm_id
      WHERE fm.user_id = ?
        AND i.current_stock_level <= i.min_stock_level * 1.5
      ORDER BY (i.min_stock_level - i.current_stock_level) DESC
    `;

    const { results: lowStockItems } = await env.DB.prepare(query)
      .bind(userId)
      .all();

    if (!lowStockItems) {
      return new Response(JSON.stringify({ error: 'Database error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify(lowStockItems), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Low stock API error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}