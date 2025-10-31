// Cloudflare Pages Function for Crops API using D1
// Handles CRUD operations for crop types, varieties, and crop planning

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const method = request.method;

  try {
    // Validate JWT authentication
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
      const endpoint = url.pathname.split('/').pop();
      
      if (endpoint === 'types') {
        // Get all crop types
        const query = `
          SELECT id, name, category, description, growth_days_min, growth_days_max,
                 optimal_temperature_min, optimal_temperature_max, water_requirements_mm
          FROM crop_types 
          ORDER BY category, name
        `;
        
        const { results: cropTypes } = await env.DB.prepare(query).all();
        
        return new Response(JSON.stringify(cropTypes), {
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      if (endpoint === 'varieties') {
        // Get crop varieties with type information
        const cropTypeId = url.searchParams.get('crop_type_id');
        let query = `
          SELECT cv.id, cv.name, cv.description, cv.maturity_days, cv.yield_potential,
                 ct.name as crop_type_name, ct.category
          FROM crop_varieties cv
          JOIN crop_types ct ON cv.crop_type_id = ct.id
        `;
        
        if (cropTypeId) {
          query += ` WHERE cv.crop_type_id = ? ORDER BY cv.name`;
          const { results: varieties } = await env.DB.prepare(query).bind(cropTypeId).all();
          return new Response(JSON.stringify(varieties), {
            headers: { 'Content-Type': 'application/json' }
          });
        } else {
          query += ` ORDER BY ct.category, cv.name`;
          const { results: varieties } = await env.DB.prepare(query).all();
          return new Response(JSON.stringify(varieties), {
            headers: { 'Content-Type': 'application/json' }
          });
        }
      }
      
      // Get planned crops for user's farms
      const query = `
        SELECT 
          f.id as field_id, f.name as field_name, f.area_hectares,
          cv.name as variety_name, ct.name as crop_type, ct.category,
          f.planting_date, f.expected_harvest_date, f.actual_harvest_date,
          f.expected_yield_tons, f.actual_yield_tons,
          fm.name as farm_name,
          DATEDIFF('day', COALESCE(f.planting_date, ''), f.expected_harvest_date) as days_to_harvest
        FROM fields f
        JOIN farms fm ON f.farm_id = fm.id
        LEFT JOIN crop_varieties cv ON f.crop_variety_id = cv.id
        LEFT JOIN crop_types ct ON cv.crop_type_id = ct.id
        JOIN farm_members fmem ON fm.id = fmem.farm_id
        WHERE fmem.user_id = ?
        ORDER BY f.planting_date DESC NULLS LAST, f.created_at DESC
      `;
      
      const { results: crops } = await env.DB.prepare(query).bind(userId).all();
      
      return new Response(JSON.stringify(crops), {
        headers: { 'Content-Type': 'application/json' }
      });
      
    } else if (method === 'POST') {
      const body = await request.json();
      const { action } = body;
      
      if (action === 'plan_crop') {
        // Plan a crop for a field
        const { 
          field_id, crop_variety_id, planting_date, expected_harvest_date,
          planting_method, seed_rate_kg_ha, expected_yield_tons,
          soil_type, irrigation_type, fertilizer_plan, pesticide_plan
        } = body;
        
        if (!field_id || !crop_variety_id) {
          return new Response(JSON.stringify({ error: 'Field ID and Crop Variety ID required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
        }
        
        // Verify user has access to farm
        const accessQuery = `
          SELECT fm.id FROM fields f
          JOIN farms farm ON f.farm_id = farm.id
          JOIN farm_members fmem ON farm.id = fmem.farm_id
          WHERE f.id = ? AND fmem.user_id = ?
        `;
        const { results: access } = await env.DB.prepare(accessQuery).bind(field_id, userId).all();
        
        if (!access || access.length === 0) {
          return new Response(JSON.stringify({ error: 'Access denied' }), {
            status: 403,
            headers: { 'Content-Type': 'application/json' }
          });
        }
        
        // Update field with crop planning data
        const updateQuery = `
          UPDATE fields SET 
            crop_variety_id = ?, planting_date = ?, expected_harvest_date = ?,
            planting_method = ?, seed_rate_kg_ha = ?, expected_yield_tons = ?,
            soil_type = ?, irrigation_type = ?, fertilizer_plan = ?, pesticide_plan = ?,
            updated_at = datetime('now')
          WHERE id = ?
        `;
        
        const result = await env.DB.prepare(updateQuery)
          .bind(
            crop_variety_id, planting_date || null, expected_harvest_date || null,
            planting_method || null, seed_rate_kg_ha || null, expected_yield_tons || null,
            soil_type || null, irrigation_type || null, 
            fertilizer_plan ? JSON.stringify(fertilizer_plan) : null,
            pesticide_plan ? JSON.stringify(pesticide_plan) : null,
            field_id
          ).run();
        
        if (!result.success) {
          return new Response(JSON.stringify({ error: 'Failed to plan crop' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          });
        }
        
        // Get the updated field with crop information
        const selectQuery = `
          SELECT 
            f.*, cv.name as variety_name, ct.name as crop_type_name
          FROM fields f
          LEFT JOIN crop_varieties cv ON f.crop_variety_id = cv.id
          LEFT JOIN crop_types ct ON cv.crop_type_id = ct.id
          WHERE f.id = ?
        `;
        
        const { results: updatedField } = await env.DB.prepare(selectQuery).bind(field_id).all();
        
        return new Response(JSON.stringify({
          message: 'Crop planned successfully',
          field: updatedField[0]
        }), {
          status: 201,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      return new Response(JSON.stringify({ error: 'Invalid action' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
      
    } else {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
  } catch (error) {
    console.error('Crops API error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}