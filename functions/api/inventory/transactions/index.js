import { createClient } from '@supabase/supabase-js';import { createClient } from '@supabase/supabase-js';

import { getDbClient } from '../../operations/db_pg.js';

export async function onRequest(context) {

  const { request, env } = context;export async function onRequest(context) {

  const url = new URL(request.url);  const { request, env } = context;

  const method = request.method;  const url = new URL(request.url);

  const method = request.method;

  try {

    // Validate JWT  try {

    const authHeader = request.headers.get('Authorization');    // Validate JWT

    if (!authHeader?.startsWith('Bearer ')) {    const authHeader = request.headers.get('Authorization');

      return new Response(JSON.stringify({ error: 'Unauthorized' }), {    if (!authHeader?.startsWith('Bearer ')) {

        status: 401,      return new Response(JSON.stringify({ error: 'Unauthorized' }), {

        headers: { 'Content-Type': 'application/json' }        status: 401,

      });        headers: { 'Content-Type': 'application/json' }

    }      });

    }

    const token = authHeader.substring(7);

    const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);    const token = authHeader.substring(7);

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);    const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {

      return new Response(JSON.stringify({ error: 'Invalid token' }), {    if (authError || !user) {

        status: 401,      return new Response(JSON.stringify({ error: 'Invalid token' }), {

        headers: { 'Content-Type': 'application/json' }        status: 401,

      });        headers: { 'Content-Type': 'application/json' }

    }      });

    }

    if (method === 'GET') {

      // Return mock inventory transactions    const client = getDbClient(env);

      const mockTransactions = [

        {    if (method === 'GET') {

          id: 'txn-1',      // List inventory transactions for user's farms

          item_id: 'inv-1',      const farmId = url.searchParams.get('farm_id');

          type: 'in',      if (!farmId) {

          quantity: 50,        return new Response(JSON.stringify({ error: 'farm_id query parameter required' }), {

          unit: 'kg',          status: 400,

          reason: 'Purchase',          headers: { 'Content-Type': 'application/json' }

          reference: 'PO-001',        });

          performed_by: user.id,      }

          performed_at: '2024-10-15T10:00:00Z'

        },      // Verify user has access to farm

        {      const farmCheck = await client.query(

          id: 'txn-2',        'SELECT id FROM farms WHERE id = $1 AND user_id = $2',

          item_id: 'inv-1',        [farmId, user.id]

          type: 'out',      );

          quantity: 10,      if (farmCheck.rows.length === 0) {

          unit: 'kg',        return new Response(JSON.stringify({ error: 'Forbidden' }), {

          reason: 'Treatment application',          status: 403,

          reference: 'TRT-001',          headers: { 'Content-Type': 'application/json' }

          performed_by: user.id,        });

          performed_at: '2024-10-20T14:30:00Z'      }

        }

      ];      const limit = parseInt(url.searchParams.get('limit') || '50');

      const offset = parseInt(url.searchParams.get('offset') || '0');

      return new Response(JSON.stringify(mockTransactions), {

        headers: { 'Content-Type': 'application/json' }      const result = await client.query(

      });        `SELECT it.*, ii.name as item_name, ii.category as item_category

         FROM inventory_transactions it

    } else if (method === 'POST') {         JOIN inventory_items ii ON ii.id = it.inventory_item_id

      // Mock transaction creation         WHERE it.farm_id = $1

      const body = await request.json();         ORDER BY it.performed_at DESC

      const mockTransaction = {         LIMIT $2 OFFSET $3`,

        id: `txn-${Date.now()}`,        [farmId, limit, offset]

        item_id: body.item_id,      );

        type: body.type || 'in',

        quantity: body.quantity || 0,      return new Response(JSON.stringify(result.rows), {

        unit: body.unit || 'units',        headers: { 'Content-Type': 'application/json' }

        reason: body.reason || 'Manual adjustment',      });

        reference: body.reference || null,

        performed_by: user.id,    } else if (method === 'POST') {

        performed_at: new Date().toISOString()      // Create inventory transaction (typically done automatically, but allow manual for adjustments)

      };      const body = await request.json();

      const { farm_id, inventory_item_id, transaction_type, quantity_delta, unit_cost, reference_type, reference_id, notes } = body;

      return new Response(JSON.stringify(mockTransaction), {

        status: 201,      if (!farm_id || !inventory_item_id || !transaction_type || quantity_delta === undefined) {

        headers: { 'Content-Type': 'application/json' }        return new Response(JSON.stringify({ error: 'farm_id, inventory_item_id, transaction_type, and quantity_delta are required' }), {

      });          status: 400,

          headers: { 'Content-Type': 'application/json' }

    } else {        });

      return new Response(JSON.stringify({ error: 'Method not allowed' }), {      }

        status: 405,

        headers: { 'Content-Type': 'application/json' }      // Verify user has access to farm

      });      const farmCheck = await client.query(

    }        'SELECT id FROM farms WHERE id = $1 AND user_id = $2',

        [farm_id, user.id]

  } catch (error) {      );

    console.error('Inventory transactions API error:', error);      if (farmCheck.rows.length === 0) {

    return new Response(JSON.stringify({ error: 'Internal server error' }), {        return new Response(JSON.stringify({ error: 'Forbidden' }), {

      status: 500,          status: 403,

      headers: { 'Content-Type': 'application/json' }          headers: { 'Content-Type': 'application/json' }

    });        });

  }      }

}
      // Verify inventory item belongs to farm
      const itemCheck = await client.query(
        'SELECT id FROM inventory_items WHERE id = $1 AND farm_id = $2',
        [inventory_item_id, farm_id]
      );
      if (itemCheck.rows.length === 0) {
        return new Response(JSON.stringify({ error: 'Invalid inventory item for this farm' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      const result = await client.query(
        `INSERT INTO inventory_transactions (inventory_item_id, farm_id, transaction_type, quantity_delta, unit_cost, reference_type, reference_id, recorded_by, notes)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         RETURNING *`,
        [inventory_item_id, farm_id, transaction_type, quantity_delta, unit_cost || null, reference_type || null, reference_id || null, user.id, notes || null]
      );

      // Update inventory quantity
      if (transaction_type === 'purchase' || transaction_type === 'adjustment') {
        await client.query(
          'UPDATE inventory_items SET quantity_on_hand = quantity_on_hand + $1 WHERE id = $2',
          [quantity_delta, inventory_item_id]
        );
      } else if (transaction_type === 'usage' || transaction_type === 'disposal') {
        await client.query(
          'UPDATE inventory_items SET quantity_on_hand = quantity_on_hand + $1 WHERE id = $2',
          [quantity_delta, inventory_item_id] // quantity_delta should be negative for usage
        );
      }

      return new Response(JSON.stringify(result.rows[0]), {
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