import { createClient } from '@supabase/supabase-js';

export async function onRequest(context) {
  const { request, env } = context;
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
      // Return mock finance entries
      const mockEntries = [
        {
          id: 'entry-1',
          type: 'income',
          amount: 1500.00,
          description: 'Corn harvest sale',
          date: '2024-10-15T00:00:00Z',
          category: 'Sales'
        }
      ];

      return new Response(JSON.stringify(mockEntries), {
        headers: { 'Content-Type': 'application/json' }
      });

    } else if (method === 'POST') {
      // Mock finance entry creation
      const body = await request.json();
      const mockEntry = {
        id: `entry-${Date.now()}`,
        type: body.type || 'expense',
        amount: body.amount || 0,
        description: body.description || 'Mock entry',
        date: new Date().toISOString(),
        category: body.category || 'General'
      };

      return new Response(JSON.stringify(mockEntry), {
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
    console.error('Finance entries API error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}