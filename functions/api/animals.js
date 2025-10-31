// Cloudflare Pages Function for Animals API using D1
// Handles CRUD operations for animals using Cloudflare D1 database

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
      // List animals for user's farms using D1
      const query = `
        SELECT
          a.id, a.tag, a.species, a.breed, a.sex, a.birth_date, a.status, a.notes, a.created_at,
          f.name as farm_name,
          s.name as sector_name
        FROM animals a
        JOIN farms f ON a.farm_id = f.id
        LEFT JOIN sectors s ON a.sector_id = s.id
        JOIN farm_members fm ON f.id = fm.farm_id
        WHERE fm.user_id = ?
        ORDER BY a.created_at DESC
      `;

      const { results: animals } = await env.DB.prepare(query)
        .bind(userId)
        .all();

      if (!animals) {
        return new Response(JSON.stringify({ error: 'Database error' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      return new Response(JSON.stringify(animals), {
        headers: { 'Content-Type': 'application/json' }
      });

    } else if (method === 'POST') {
      // Create animal
      const body = await request.json();
      const { farm_id, tag, species, breed, sex, birth_date, notes, sector_id } = body;

      if (!farm_id || !tag || !species) {
        return new Response(JSON.stringify({ error: 'Farm ID, tag, and species required' }), {
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

      // Insert new animal
      const insertQuery = `
        INSERT INTO animals (farm_id, tag, species, breed, sex, birth_date, notes, sector_id, status, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'active', datetime('now'))
      `;

      const result = await env.DB.prepare(insertQuery)
        .bind(farm_id, tag, species, breed || null, sex || null, birth_date || null, notes || null, sector_id || null)
        .run();

      if (!result.success) {
        return new Response(JSON.stringify({ error: 'Failed to create animal' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Get the created animal
      const newAnimalId = result.meta.last_row_id;
      const selectQuery = `
        SELECT
          a.id, a.tag, a.species, a.breed, a.sex, a.birth_date, a.status, a.notes, a.created_at,
          f.name as farm_name,
          s.name as sector_name
        FROM animals a
        JOIN farms f ON a.farm_id = f.id
        LEFT JOIN sectors s ON a.sector_id = s.id
        WHERE a.id = ?
      `;

      const { results: newAnimal } = await env.DB.prepare(selectQuery)
        .bind(newAnimalId)
        .all();

      return new Response(JSON.stringify(newAnimal[0]), {
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
    console.error('Animals API error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}