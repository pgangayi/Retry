export async function onRequest(context) {
  const { request, env, params } = context;
  const method = request.method;
  const itemId = params.id;

  try {
    // Validate JWT
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const token = authHeader.substring(7);
    // TODO: Implement JWT verification for Cloudflare auth
    // For now, we'll assume authenticated user with ID 'temp-user'
    const user = { id: 'temp-user' };

    if (method === 'GET') {
      // Get inventory item details
      const stmt = env.DB.prepare(`
        SELECT * FROM inventory_items WHERE id = ?
      `);
      const item = await stmt.bind(itemId).first();

      if (!item) {
        return new Response(JSON.stringify({ error: 'Item not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Verify user has access to the item's farm
      const accessStmt = env.DB.prepare(`
        SELECT id FROM farm_members WHERE farm_id = ? AND user_id = ?
      `);
      const farmAccess = await accessStmt.bind(item.farm_id, user.id).first();

      if (!farmAccess) {
        return new Response(JSON.stringify({ error: 'Forbidden' }), {
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      return new Response(JSON.stringify(item), {
        headers: { 'Content-Type': 'application/json' }
      });

    } else if (method === 'PUT') {
      // Update inventory item
      const body = await request.json();

      // First check if item exists and user has access
      const getStmt = env.DB.prepare(`
        SELECT farm_id FROM inventory_items WHERE id = ?
      `);
      const existingItem = await getStmt.bind(itemId).first();

      if (!existingItem) {
        return new Response(JSON.stringify({ error: 'Item not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Verify user has access to the item's farm
      const accessStmt = env.DB.prepare(`
        SELECT id FROM farm_members WHERE farm_id = ? AND user_id = ?
      `);
      const farmAccess = await accessStmt.bind(existingItem.farm_id, user.id).first();

      if (!farmAccess) {
        return new Response(JSON.stringify({ error: 'Forbidden' }), {
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Update the item
      const updateStmt = env.DB.prepare(`
        UPDATE inventory_items
        SET name = ?, category = ?, sku = ?, unit = ?, quantity_on_hand = ?,
            reorder_threshold = ?, unit_cost = ?, supplier = ?, notes = ?,
            updated_at = datetime('now')
        WHERE id = ?
        RETURNING *
      `);

      const result = await updateStmt.bind(
        body.name,
        body.category,
        body.sku,
        body.unit,
        body.quantity_on_hand,
        body.reorder_threshold,
        body.unit_cost,
        body.supplier,
        body.notes,
        itemId
      ).first();

      if (!result) {
        return new Response(JSON.stringify({ error: 'Failed to update item' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      return new Response(JSON.stringify(result), {
        headers: { 'Content-Type': 'application/json' }
      });

    } else if (method === 'DELETE') {
      // Delete inventory item
      // First check if item exists and user has access
      const getStmt = env.DB.prepare(`
        SELECT farm_id FROM inventory_items WHERE id = ?
      `);
      const existingItem = await getStmt.bind(itemId).first();

      if (!existingItem) {
        return new Response(JSON.stringify({ error: 'Item not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Verify user has access to the item's farm
      const accessStmt = env.DB.prepare(`
        SELECT id FROM farm_members WHERE farm_id = ? AND user_id = ?
      `);
      const farmAccess = await accessStmt.bind(existingItem.farm_id, user.id).first();

      if (!farmAccess) {
        return new Response(JSON.stringify({ error: 'Forbidden' }), {
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      const deleteStmt = env.DB.prepare(`
        DELETE FROM inventory_items WHERE id = ?
      `);
      await deleteStmt.bind(itemId).run();

      return new Response(JSON.stringify({ message: 'Item deleted successfully' }), {
        headers: { 'Content-Type': 'application/json' }
      });

    } else {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' }
      });
    }

  } catch (error) {
    console.error('Inventory item API error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}