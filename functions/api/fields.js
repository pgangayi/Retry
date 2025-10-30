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
      // Return mock fields data for testing
      const mockFields = [
        {
          id: 'field-1',
          name: 'North Field',
          area_hectares: 5.2,
          crop_type: 'Corn',
          notes: 'Main corn field',
          created_at: '2024-01-15T10:00:00Z',
          farm_name: 'Green Valley Farm'
        },
        {
          id: 'field-2',
          name: 'South Pasture',
          area_hectares: 8.1,
          crop_type: null,
          notes: 'Grazing area',
          created_at: '2024-02-01T14:30:00Z',
          farm_name: 'Green Valley Farm'
        }
      ];

      return new Response(JSON.stringify(mockFields), {
        headers: { 'Content-Type': 'application/json' }
      });

    } else if (method === 'POST') {
      // Mock field creation
      const body = await request.json();
      const { farm_id, name } = body;

      if (!farm_id || !name) {
        return new Response(JSON.stringify({ error: 'Farm ID and name required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      const mockField = {
        id: `field-${Date.now()}`,
        name,
        area_hectares: body.area_hectares || null,
        crop_type: body.crop_type || null,
        notes: body.notes || null,
        created_at: new Date().toISOString(),
        farm_name: 'Mock Farm'
      };

      return new Response(JSON.stringify(mockField), {
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