// Cloudflare Pages Function for Crop Observations API
// Handles crop growth monitoring and health tracking

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
    const { AuthUtils } = await import('../_auth.js');
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
      // Get crop observations for user's farms
      const fieldId = url.searchParams.get('field_id');
      const cropVarietyId = url.searchParams.get('crop_variety_id');
      const dateFrom = url.searchParams.get('date_from');
      const dateTo = url.searchParams.get('date_to');
      
      let query = `
        SELECT 
          co.id, co.observation_date, co.growth_stage, co.plant_height_cm,
          co.leaf_color, co.pest_presence, co.disease_presence, co.weed_pressure,
          co.soil_moisture, co.plant_density_per_m2, co.uniformity_score,
          co.health_score, co.photos, co.notes,
          f.name as field_name, cv.name as crop_variety_name,
          ct.name as crop_type
        FROM crop_observations co
        JOIN fields f ON co.field_id = f.id
        JOIN farms fm ON f.farm_id = fm.id
        LEFT JOIN crop_varieties cv ON co.crop_variety_id = cv.id
        LEFT JOIN crop_types ct ON cv.crop_type_id = ct.id
        JOIN farm_members fmem ON fm.id = fmem.farm_id
        WHERE fmem.user_id = ?
      `;
      
      const params = [userId];
      
      if (fieldId) {
        query += ` AND co.field_id = ?`;
        params.push(fieldId);
      }
      
      if (cropVarietyId) {
        query += ` AND co.crop_variety_id = ?`;
        params.push(cropVarietyId);
      }
      
      if (dateFrom) {
        query += ` AND co.observation_date >= ?`;
        params.push(dateFrom);
      }
      
      if (dateTo) {
        query += ` AND co.observation_date <= ?`;
        params.push(dateTo);
      }
      
      query += ` ORDER BY co.observation_date DESC`;
      
      const { results: observations } = await env.DB.prepare(query).bind(...params).all();
      
      // Parse JSON fields
      const parsedObservations = observations.map(obs => ({
        ...obs,
        pest_presence: obs.pest_presence ? JSON.parse(obs.pest_presence) : [],
        disease_presence: obs.disease_presence ? JSON.parse(obs.disease_presence) : [],
        photos: obs.photos ? JSON.parse(obs.photos) : []
      }));
      
      return new Response(JSON.stringify(parsedObservations), {
        headers: { 'Content-Type': 'application/json' }
      });
      
    } else if (method === 'POST') {
      // Create new crop observation
      const body = await request.json();
      const { 
        field_id, crop_variety_id, observation_date, growth_stage,
        plant_height_cm, leaf_color, pest_presence, disease_presence,
        weed_pressure, soil_moisture, plant_density_per_m2,
        uniformity_score, health_score, photos, notes
      } = body;
      
      if (!field_id || !crop_variety_id || !observation_date) {
        return new Response(JSON.stringify({ 
          error: 'Field ID, Crop Variety ID, and Observation Date are required' 
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      // Verify user has access to farm
      const accessQuery = `
        SELECT f.farm_id FROM fields f
        JOIN farms farm ON f.farm_id = farm.id
        JOIN farm_members fmem ON farm.id = fmem.farm_id
        WHERE f.id = ? AND fmem.user_id = ?
      `;
      
      const { results: fieldAccess } = await env.DB.prepare(accessQuery).bind(field_id, userId).all();
      
      if (!fieldAccess || fieldAccess.length === 0) {
        return new Response(JSON.stringify({ error: 'Access denied' }), {
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      // Insert new observation
      const insertQuery = `
        INSERT INTO crop_observations (
          field_id, crop_variety_id, observation_date, growth_stage,
          plant_height_cm, leaf_color, pest_presence, disease_presence,
          weed_pressure, soil_moisture, plant_density_per_m2,
          uniformity_score, health_score, photos, notes, observer, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
      `;
      
      const result = await env.DB.prepare(insertQuery)
        .bind(
          field_id, crop_variety_id, observation_date, growth_stage || null,
          plant_height_cm || null, leaf_color || null,
          pest_presence ? JSON.stringify(pest_presence) : null,
          disease_presence ? JSON.stringify(disease_presence) : null,
          weed_pressure || null, soil_moisture || null,
          plant_density_per_m2 || null, uniformity_score || null,
          health_score || null, photos ? JSON.stringify(photos) : null,
          notes || null, userId
        ).run();
      
      if (!result.success) {
        return new Response(JSON.stringify({ error: 'Failed to create observation' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      const newObservationId = result.meta.last_row_id;
      
      // Get the created observation
      const selectQuery = `
        SELECT co.*, f.name as field_name, cv.name as crop_variety_name
        FROM crop_observations co
        JOIN fields f ON co.field_id = f.id
        LEFT JOIN crop_varieties cv ON co.crop_variety_id = cv.id
        WHERE co.id = ?
      `;
      
      const { results: newObservation } = await env.DB.prepare(selectQuery).bind(newObservationId).all();
      
      return new Response(JSON.stringify({
        message: 'Observation recorded successfully',
        observation: {
          ...newObservation[0],
          pest_presence: newObservation[0].pest_presence ? JSON.parse(newObservation[0].pest_presence) : [],
          disease_presence: newObservation[0].disease_presence ? JSON.parse(newObservation[0].disease_presence) : [],
          photos: newObservation[0].photos ? JSON.parse(newObservation[0].photos) : []
        }
      }), {
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
    console.error('Crop Observations API error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}