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

    // Use service role client for database operations
    const dbClient = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

    if (method === 'GET') {
      // List farms for user
      const { data: farms, error } = await dbClient
        .from('farms')
        .select('id, name, location, area_hectares, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Database error:', error);
        return new Response(JSON.stringify({ error: 'Database error' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      return new Response(JSON.stringify(farms), {
        headers: { 'Content-Type': 'application/json' }
      });

    } else if (method === 'POST') {
      // Create farm
      const body = await request.json();
      const { name, location, area_hectares } = body;

      if (!name || !location) {
        return new Response(JSON.stringify({ error: 'Name and location required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      const { data: newFarm, error: insertError } = await dbClient
        .from('farms')
        .insert({
          user_id: user.id,
          name,
          location,
          area_hectares: area_hectares || null
        })
        .select()
        .single();

      if (insertError) {
        console.error('Insert error:', insertError);
        return new Response(JSON.stringify({ error: 'Failed to create farm' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      return new Response(JSON.stringify(newFarm), {
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
    console.error('Farm API error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}