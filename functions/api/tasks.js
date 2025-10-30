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
      // Return mock tasks data for testing
      const mockTasks = [
        {
          id: 'task-1',
          title: 'Plant corn seeds',
          description: 'Plant corn seeds in North Field',
          status: 'pending',
          priority: 'high',
          due_date: '2024-11-15T00:00:00Z',
          created_at: '2024-10-30T10:00:00Z',
          farm_name: 'Green Valley Farm',
          assigned_to_name: 'John Farmer'
        },
        {
          id: 'task-2',
          title: 'Check irrigation system',
          description: 'Inspect irrigation system in South Field',
          status: 'in_progress',
          priority: 'medium',
          due_date: '2024-11-01T00:00:00Z',
          created_at: '2024-10-28T14:30:00Z',
          farm_name: 'Green Valley Farm',
          assigned_to_name: null
        }
      ];

      return new Response(JSON.stringify(mockTasks), {
        headers: { 'Content-Type': 'application/json' }
      });

    } else if (method === 'POST') {
      // Mock task creation
      const body = await request.json();
      const { farm_id, title, description, priority, due_date } = body;

      if (!farm_id || !title) {
        return new Response(JSON.stringify({ error: 'Farm ID and title required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      const mockTask = {
        id: `task-${Date.now()}`,
        title,
        description: description || null,
        status: 'pending',
        priority: priority || 'medium',
        due_date: due_date || null,
        created_at: new Date().toISOString(),
        farm_name: 'Mock Farm',
        assigned_to_name: null
      };

      return new Response(JSON.stringify(mockTask), {
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
    console.error('Tasks API error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}