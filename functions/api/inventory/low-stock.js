import { createClient } from '@supabase/supabase-js';

export async function onRequest(context) {
  const { request, env } = context;

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

    // Return mock low stock items
    const mockLowStock = [
      {
        id: 'inv-1',
        name: 'Fertilizer',
        current_stock: 5,
        min_stock_level: 20,
        unit: 'bags',
        status: 'low_stock'
      }
    ];

    return new Response(JSON.stringify(mockLowStock), {
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