// Cloudflare Pages Function for Inventory Transactions API using D1
// Handles CRUD operations for inventory transactions using Cloudflare D1 database

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
    const { AuthUtils } = await import('../../_auth.js');
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
      // List inventory transactions for user's farms using D1
      const farmId = url.searchParams.get('farm_id');
      if (!farmId) {
        return new Response(JSON.stringify({ error: 'farm_id query parameter required' }), {
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
        .bind(farmId, userId)
        .all();

      if (!farmAccess || farmAccess.length === 0) {
        return new Response(JSON.stringify({ error: 'Forbidden' }), {
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      const limit = parseInt(url.searchParams.get('limit') || '50');
      const offset = parseInt(url.searchParams.get('offset') || '0');

      // Get inventory transactions with item details
      const query = `
        SELECT
          it.id, it.inventory_item_id, it.transaction_type, it.quantity_delta,
          it.unit_cost, it.reference_type, it.reference_id, it.recorded_by,
          it.notes, it.created_at,
          i.name as item_name, i.category as item_category, i.unit
        FROM inventory_transactions it
        JOIN inventory i ON i.id = it.inventory_item_id
        WHERE it.farm_id = ?
        ORDER BY it.created_at DESC
        LIMIT ? OFFSET ?
      `;

      const { results: transactions } = await env.DB.prepare(query)
        .bind(farmId, limit, offset)
        .all();

      if (!transactions) {
        return new Response(JSON.stringify({ error: 'Database error' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      return new Response(JSON.stringify(transactions), {
        headers: { 'Content-Type': 'application/json' }
      });

    } else if (method === 'POST') {
      // Create inventory transaction
      const body = await request.json();
      const { farm_id, inventory_item_id, transaction_type, quantity_delta, unit_cost, reference_type, reference_id, notes } = body;

      if (!farm_id || !inventory_item_id || !transaction_type || quantity_delta === undefined) {
        return new Response(JSON.stringify({ error: 'farm_id, inventory_item_id, transaction_type, and quantity_delta are required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Verify user has access to farm
      const farmAccessQuery = `
        SELECT id FROM farm_members
        WHERE farm_id = ? AND user_id = ?
      `;
      const { results: farmAccess } = await env.DB.prepare(farmAccessQuery)
        .bind(farm_id, userId)
        .all();

      if (!farmAccess || farmAccess.length === 0) {
        return new Response(JSON.stringify({ error: 'Forbidden' }), {
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Verify inventory item belongs to farm
      const itemCheckQuery = `
        SELECT id FROM inventory
        WHERE id = ? AND farm_id = ?
      `;
      const { results: itemCheck } = await env.DB.prepare(itemCheckQuery)
        .bind(inventory_item_id, farm_id)
        .all();

      if (!itemCheck || itemCheck.length === 0) {
        return new Response(JSON.stringify({ error: 'Invalid inventory item for this farm' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Insert transaction
      const insertQuery = `
        INSERT INTO inventory_transactions (inventory_item_id, farm_id, transaction_type, quantity_delta, unit_cost, reference_type, reference_id, recorded_by, notes, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
      `;

      const result = await env.DB.prepare(insertQuery)
        .bind(inventory_item_id, farm_id, transaction_type, quantity_delta, unit_cost || null, reference_type || null, reference_id || null, userId, notes || null)
        .run();

      if (!result.success) {
        return new Response(JSON.stringify({ error: 'Failed to create transaction' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Update inventory quantity
      let quantityUpdate = quantity_delta;
      if (transaction_type === 'usage' || transaction_type === 'disposal') {
        // For usage/disposal, quantity_delta should already be negative
        quantityUpdate = quantity_delta;
      }

      const updateQuery = `
        UPDATE inventory
        SET current_stock_level = current_stock_level + ?
        WHERE id = ?
      `;

      await env.DB.prepare(updateQuery)
        .bind(quantityUpdate, inventory_item_id)
        .run();

      // Get the created transaction
      const newTransactionId = result.meta.last_row_id;
      const selectQuery = `
        SELECT
          it.id, it.inventory_item_id, it.transaction_type, it.quantity_delta,
          it.unit_cost, it.reference_type, it.reference_id, it.recorded_by,
          it.notes, it.created_at,
          i.name as item_name, i.category as item_category, i.unit
        FROM inventory_transactions it
        JOIN inventory i ON i.id = it.inventory_item_id
        WHERE it.id = ?
      `;

      const { results: newTransaction } = await env.DB.prepare(selectQuery)
        .bind(newTransactionId)
        .all();

      return new Response(JSON.stringify(newTransaction[0]), {
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
    console.error('Inventory transactions API error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}