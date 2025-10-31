// Cloudflare Pages Function for Harvest Records API
// Handles harvest tracking, yield recording, and revenue calculation

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
      // Get harvest records for user's farms
      const farmId = url.searchParams.get('farm_id');
      const fieldId = url.searchParams.get('field_id');
      const dateFrom = url.searchParams.get('date_from');
      const dateTo = url.searchParams.get('date_to');
      
      let query = `
        SELECT 
          hr.id, hr.harvest_date, hr.harvest_method, hr.quantity_harvested,
          hr.unit, hr.quality_grade, hr.moisture_content, hr.price_per_unit,
          hr.total_value, hr.storage_location, hr.buyer_info, hr.quality_notes,
          f.name as field_name, cv.name as crop_variety_name,
          ct.name as crop_type, fm.name as farm_name,
          DATEDIFF('day', f.planting_date, hr.harvest_date) as days_to_harvest
        FROM harvest_records hr
        JOIN fields f ON hr.field_id = f.id
        JOIN farms fm ON f.farm_id = fm.id
        LEFT JOIN crop_varieties cv ON hr.crop_variety_id = cv.id
        LEFT JOIN crop_types ct ON cv.crop_type_id = ct.id
        JOIN farm_members fmem ON fm.id = fmem.farm_id
        WHERE fmem.user_id = ?
      `;
      
      const params = [userId];
      
      if (farmId) {
        query += ` AND hr.farm_id = ?`;
        params.push(farmId);
      }
      
      if (fieldId) {
        query += ` AND hr.field_id = ?`;
        params.push(fieldId);
      }
      
      if (dateFrom) {
        query += ` AND hr.harvest_date >= ?`;
        params.push(dateFrom);
      }
      
      if (dateTo) {
        query += ` AND hr.harvest_date <= ?`;
        params.push(dateTo);
      }
      
      query += ` ORDER BY hr.harvest_date DESC`;
      
      const { results: harvests } = await env.DB.prepare(query).bind(...params).all();
      
      // Calculate totals
      const totalRevenue = harvests.reduce((sum, h) => sum + (h.total_value || 0), 0);
      const totalQuantity = harvests.reduce((sum, h) => sum + (h.quantity_harvested || 0), 0);
      const avgPrice = totalQuantity > 0 ? totalRevenue / totalQuantity : 0;
      
      return new Response(JSON.stringify({
        harvests,
        summary: {
          total_revenue: totalRevenue,
          total_quantity: totalQuantity,
          average_price: avgPrice,
          harvest_count: harvests.length
        }
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
      
    } else if (method === 'POST') {
      // Create new harvest record
      const body = await request.json();
      const { 
        field_id, harvest_date, harvest_method, quantity_harvested,
        unit, quality_grade, moisture_content, price_per_unit,
        storage_location, buyer_info, quality_notes
      } = body;
      
      if (!field_id || !harvest_date || !quantity_harvested || !unit) {
        return new Response(JSON.stringify({ 
          error: 'Field ID, Harvest Date, Quantity, and Unit are required' 
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      // Verify user has access to farm
      const accessQuery = `
        SELECT f.farm_id, f.crop_variety_id FROM fields f
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
      
      const { farm_id, crop_variety_id } = fieldAccess[0];
      
      // Calculate total value
      const totalValue = price_per_unit ? quantity_harvested * price_per_unit : null;
      
      // Insert new harvest record
      const insertQuery = `
        INSERT INTO harvest_records (
          field_id, crop_variety_id, harvest_date, harvest_method,
          quantity_harvested, unit, quality_grade, moisture_content,
          price_per_unit, total_value, storage_location, buyer_info,
          quality_notes, recorded_by, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
      `;
      
      const result = await env.DB.prepare(insertQuery)
        .bind(
          field_id, crop_variety_id, harvest_date, harvest_method || null,
          quantity_harvested, unit, quality_grade || null,
          moisture_content || null, price_per_unit || null, totalValue,
          storage_location || null, buyer_info || null, quality_notes || null,
          userId
        ).run();
      
      if (!result.success) {
        return new Response(JSON.stringify({ error: 'Failed to record harvest' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      // Update field with actual harvest data
      const updateFieldQuery = `
        UPDATE fields SET 
          actual_harvest_date = ?, actual_yield_tons = ?
        WHERE id = ?
      `;
      
      // Convert to tons if needed
      let actualYieldTons = quantity_harvested;
      if (unit.toLowerCase() === 'kg') {
        actualYieldTons = quantity_harvested / 1000;
      }
      // Add more unit conversions as needed
      
      await env.DB.prepare(updateFieldQuery)
        .bind(harvest_date, actualYieldTons, field_id)
        .run();
      
      // Create finance entry if price provided
      if (totalValue && totalValue > 0) {
        const financeInsertQuery = `
          INSERT INTO finance_entries (
            farm_id, type, amount, description, date, category, created_by, created_at
          ) VALUES (?, 'income', ?, ?, ?, 'Crop Sales', ?, datetime('now'))
        `;
        
        await env.DB.prepare(financeInsertQuery)
          .bind(
            farm_id, totalValue, 
            `Harvest from ${field_id} - ${quantity_harvested} ${unit}`,
            harvest_date, userId
          ).run();
      }
      
      const newHarvestId = result.meta.last_row_id;
      
      // Get the created harvest record
      const selectQuery = `
        SELECT hr.*, f.name as field_name, cv.name as crop_variety_name
        FROM harvest_records hr
        JOIN fields f ON hr.field_id = f.id
        LEFT JOIN crop_varieties cv ON hr.crop_variety_id = cv.id
        WHERE hr.id = ?
      `;
      
      const { results: newHarvest } = await env.DB.prepare(selectQuery).bind(newHarvestId).all();
      
      return new Response(JSON.stringify({
        message: 'Harvest recorded successfully',
        harvest: newHarvest[0],
        finance_entry_created: !!(totalValue && totalValue > 0)
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
    console.error('Harvest Records API error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}