// Cloudflare Pages Function for Tasks API using D1
// Handles CRUD operations for tasks using Cloudflare D1 database

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
    const { AuthUtils } = await import('./_auth.js');
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
      // List tasks for user's farms using D1
      const query = `
        SELECT
          t.id, t.title, t.description, t.status, t.priority, t.due_date, t.created_at,
          f.name as farm_name,
          u.name as assigned_to_name
        FROM tasks t
        JOIN farms f ON t.farm_id = f.id
        LEFT JOIN users u ON t.assigned_to = u.id
        JOIN farm_members fm ON f.id = fm.farm_id
        WHERE fm.user_id = ?
        ORDER BY t.created_at DESC
      `;

      const { results: tasks } = await env.DB.prepare(query)
        .bind(userId)
        .all();

      if (!tasks) {
        return new Response(JSON.stringify({ error: 'Database error' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      return new Response(JSON.stringify(tasks), {
        headers: { 'Content-Type': 'application/json' }
      });

    } else if (method === 'POST') {
      // Create task
      const body = await request.json();
      const { farm_id, title, description, priority, due_date, assigned_to } = body;

      if (!farm_id || !title) {
        return new Response(JSON.stringify({ error: 'Farm ID and title required' }), {
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
        .bind(farm_id, userId)
        .all();

      if (!farmAccess || farmAccess.length === 0) {
        return new Response(JSON.stringify({ error: 'Access denied' }), {
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Insert new task
      const insertQuery = `
        INSERT INTO tasks (farm_id, title, description, status, priority, due_date, assigned_to, created_by, created_at)
        VALUES (?, ?, ?, 'pending', ?, ?, ?, ?, datetime('now'))
      `;

      const result = await env.DB.prepare(insertQuery)
        .bind(farm_id, title, description || null, priority || 'medium', due_date || null, assigned_to || null, userId)
        .run();

      if (!result.success) {
        return new Response(JSON.stringify({ error: 'Failed to create task' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Get the created task
      const newTaskId = result.meta.last_row_id;
      const selectQuery = `
        SELECT
          t.id, t.title, t.description, t.status, t.priority, t.due_date, t.created_at,
          f.name as farm_name,
          u.name as assigned_to_name
        FROM tasks t
        JOIN farms f ON t.farm_id = f.id
        LEFT JOIN users u ON t.assigned_to = u.id
        WHERE t.id = ?
      `;

      const { results: newTask } = await env.DB.prepare(selectQuery)
        .bind(newTaskId)
        .all();

      return new Response(JSON.stringify(newTask[0]), {
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