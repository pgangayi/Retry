import { createClient } from '@supabase/supabase-js';

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const method = request.method;

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

    if (method === 'GET') {
      // Return mock inventory data for testing
      const mockInventory = [
        {
          id: 'inv-1',
          name: 'Corn Seeds',
          category: 'Seeds',
          quantity: 150,
          unit: 'kg',
          min_stock_level: 50,
          current_stock_level: 150,
          location: 'Warehouse A',
          expiry_date: '2025-06-01T00:00:00Z',
          created_at: '2024-10-01T10:00:00Z'
        },
        {
          id: 'inv-2',
          name: 'Fertilizer',
          category: 'Chemicals',
          quantity: 75,
          unit: 'bags',
          min_stock_level: 20,
          current_stock_level: 75,
          location: 'Warehouse B',
          expiry_date: null,
          created_at: '2024-09-15T14:30:00Z'
        }
      ];

      return new Response(JSON.stringify(mockInventory), {
        headers: { 'Content-Type': 'application/json' }
      });

    } else if (method === 'POST') {
      // Mock inventory item creation
      const body = await request.json();
      const { name, category, quantity, unit, min_stock_level } = body;

      if (!name || !category) {
        return new Response(JSON.stringify({ error: 'Name and category required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      const mockItem = {
        id: `inv-${Date.now()}`,
        name,
        category,
        quantity: quantity || 0,
        unit: unit || 'units',
        min_stock_level: min_stock_level || 10,
        current_stock_level: quantity || 0,
        location: 'Warehouse A',
        expiry_date: null,
        created_at: new Date().toISOString()
      };

      return new Response(JSON.stringify(mockItem), {
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