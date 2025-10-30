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
      // List animals for user's farms
      const { data: animals, error } = await dbClient
        .from('animals')
        .select(`
          id, tag, species, breed, sex, birth_date, status, notes, created_at,
          farms!inner(name),
          farm_members!inner(user_id),
          sectors(name)
        `)
        .eq('farm_members.user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Database error:', error);
        return new Response(JSON.stringify({ error: 'Database error' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Transform the data to match the expected format
      const transformedAnimals = animals.map(animal => ({
        id: animal.id,
        tag: animal.tag,
        species: animal.species,
        breed: animal.breed,
        sex: animal.sex,
        birth_date: animal.birth_date,
        status: animal.status,
        notes: animal.notes,
        created_at: animal.created_at,
        farm_name: animal.farms?.name,
        sector_name: animal.sectors?.name
      }));

      return new Response(JSON.stringify(transformedAnimals), {
        headers: { 'Content-Type': 'application/json' }
      });

    } else if (method === 'POST') {
      // Create animal
      const body = await request.json();
      const { farm_id, tag, species, breed, sex, birth_date, notes } = body;

      if (!farm_id || !tag || !species) {
        return new Response(JSON.stringify({ error: 'Farm ID, tag, and species required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Verify user has access to farm
      const { data: farmAccess, error: accessError } = await dbClient
        .from('farm_members')
        .select('id')
        .eq('farm_id', farm_id)
        .eq('user_id', user.id)
        .single();

      if (accessError || !farmAccess) {
        return new Response(JSON.stringify({ error: 'Access denied' }), {
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      const { data: newAnimal, error: insertError } = await dbClient
        .from('animals')
        .insert({
          farm_id,
          tag,
          species,
          breed: breed || null,
          sex: sex || null,
          birth_date: birth_date || null,
          notes: notes || null
        })
        .select()
        .single();

      if (insertError) {
        console.error('Insert error:', insertError);
        return new Response(JSON.stringify({ error: 'Failed to create animal' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      return new Response(JSON.stringify(newAnimal), {
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