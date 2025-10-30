import { createClient } from '@supabase/supabase-js';

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
    const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Use service role client for database operations
    const dbClient = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

    if (method === 'GET') {
      // Get inventory item details
      const { data: item, error } = await dbClient
        .from('inventory_items')
        .select('*')
        .eq('id', itemId)
        .single();

      if (error || !item) {
        return new Response(JSON.stringify({ error: 'Item not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Verify user has access to the item's farm
      const { data: farmAccess, error: accessError } = await dbClient
        .from('farm_members')
        .select('id')
        .eq('farm_id', item.farm_id)
        .eq('user_id', user.id)
        .single();

      if (accessError || !farmAccess) {
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
      const { data: existingItem, error: getError } = await dbClient
        .from('inventory_items')
        .select('farm_id')
        .eq('id', itemId)
        .single();

      if (getError || !existingItem) {
        return new Response(JSON.stringify({ error: 'Item not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Verify user has access to the item's farm
      const { data: farmAccess, error: accessError } = await dbClient
        .from('farm_members')
        .select('id')
        .eq('farm_id', existingItem.farm_id)
        .eq('user_id', user.id)
        .single();

      if (accessError || !farmAccess) {
        return new Response(JSON.stringify({ error: 'Forbidden' }), {
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      const { data: updatedItem, error: updateError } = await dbClient
        .from('inventory_items')
        .update(body)
        .eq('id', itemId)
        .select()
        .single();

      if (updateError) {
        console.error('Update error:', updateError);
        return new Response(JSON.stringify({ error: 'Failed to update item' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      return new Response(JSON.stringify(updatedItem), {
        headers: { 'Content-Type': 'application/json' }
      });

    } else if (method === 'DELETE') {
      // Delete inventory item
      // First check if item exists and user has access
      const { data: existingItem, error: getError } = await dbClient
        .from('inventory_items')
        .select('farm_id')
        .eq('id', itemId)
        .single();

      if (getError || !existingItem) {
        return new Response(JSON.stringify({ error: 'Item not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Verify user has access to the item's farm
      const { data: farmAccess, error: accessError } = await dbClient
        .from('farm_members')
        .select('id')
        .eq('farm_id', existingItem.farm_id)
        .eq('user_id', user.id)
        .single();

      if (accessError || !farmAccess) {
        return new Response(JSON.stringify({ error: 'Forbidden' }), {
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      const { error: deleteError } = await dbClient
        .from('inventory_items')
        .delete()
        .eq('id', itemId);

      if (deleteError) {
        console.error('Delete error:', deleteError);
        return new Response(JSON.stringify({ error: 'Failed to delete item' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }

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