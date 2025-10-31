// Cloudflare Pages Function for Crop Operations API
// Handles crop operations management (planting, fertilizing, harvesting, etc.)

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
      // Get crop operations for user's farms
      const farmId = url.searchParams.get('farm_id');
      const fieldId = url.searchParams.get('field_id');
      const status = url.searchParams.get('status');
      const dateFrom = url.searchParams.get('date_from');
      const dateTo = url.searchParams.get('date_to');
      
      let query = `
        SELECT 
          co.id, co.operation_type, co.operation_name, co.scheduled_date, co.completed_date,
          co.status, co.equipment_used, co.input_used, co.cost, co.weather_conditions, co.notes,
          f.name as field_name, fm.name as farm_name,
          cv.name as crop_variety_name, ct.name as crop_type
        FROM crop_operations co
        JOIN fields f ON co.field_id = f.id
        JOIN farms fm ON co.farm_id = fm.id
        LEFT JOIN crop_varieties cv ON f.crop_variety_id = cv.id
        LEFT JOIN crop_types ct ON cv.crop_type_id = ct.id
        JOIN farm_members fmem ON fm.id = fmem.farm_id
        WHERE fmem.user_id = ?
      `;
      
      const params = [userId];
      
      if (farmId) {
        query += ` AND co.farm_id = ?`;
        params.push(farmId);
      }
      
      if (fieldId) {
        query += ` AND co.field_id = ?`;
        params.push(fieldId);
      }
      
      if (status) {
        query += ` AND co.status = ?`;
        params.push(status);
      }
      
      if (dateFrom) {
        query += ` AND co.scheduled_date >= ?`;
        params.push(dateFrom);
      }
      
      if (dateTo) {
        query += ` AND co.scheduled_date <= ?`;
        params.push(dateTo);
      }
      
      query += ` ORDER BY co.scheduled_date DESC`;
      
      const { results: operations } = await env.DB.prepare(query).bind(...params).all();
      
      // Parse JSON fields
      const parsedOperations = operations.map(op => ({
        ...op,
        input_used: op.input_used ? JSON.parse(op.input_used) : null,
        cost: op.cost ? parseFloat(op.cost) : null
      }));
      
      return new Response(JSON.stringify(parsedOperations), {
        headers: { 'Content-Type': 'application/json' }
      });
      
    } else if (method === 'POST') {
      // Create new crop operation
      const body = await request.json();
      const { 
        field_id, operation_type, operation_name, scheduled_date, 
        equipment_used, input_used, cost, weather_conditions, notes
      } = body;
      
      if (!field_id || !operation_type || !operation_name || !scheduled_date) {
        return new Response(JSON.stringify({ 
          error: 'Field ID, operation type, operation name, and scheduled date are required' 
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      // Verify user has access to farm
      const accessQuery = `
        SELECT co.farm_id FROM crop_operations co
        JOIN fields f ON co.field_id = f.id
        JOIN farms farm ON f.farm_id = farm.id
        JOIN farm_members fmem ON farm.id = fmem.farm_id
        WHERE f.id = ? AND fmem.user_id = ?
      `;
      
      // Since we don't have the operation yet, we need to get farm_id from field
      const fieldQuery = `
        SELECT f.farm_id FROM fields f
        JOIN farms farm ON f.farm_id = farm.id
        JOIN farm_members fmem ON farm.id = fmem.farm_id
        WHERE f.id = ? AND fmem.user_id = ?
      `;
      
      const { results: fieldAccess } = await env.DB.prepare(fieldQuery).bind(field_id, userId).all();
      
      if (!fieldAccess || fieldAccess.length === 0) {
        return new Response(JSON.stringify({ error: 'Access denied' }), {
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      const farmId = fieldAccess[0].farm_id;
      
      // Insert new operation
      const insertQuery = `
        INSERT INTO crop_operations (
          field_id, farm_id, operation_type, operation_name, scheduled_date,
          status, equipment_used, input_used, cost, weather_conditions, notes,
          created_by, created_at
        ) VALUES (?, ?, ?, ?, ?, 'scheduled', ?, ?, ?, ?, ?, ?, datetime('now'))
      `;
      
      const result = await env.DB.prepare(insertQuery)
        .bind(
          field_id, farmId, operation_type, operation_name, scheduled_date,
          equipment_used || null,
          input_used ? JSON.stringify(input_used) : null,
          cost || null, weather_conditions || null, notes || null,
          userId
        ).run();
      
      if (!result.success) {
        return new Response(JSON.stringify({ error: 'Failed to create operation' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      const newOperationId = result.meta.last_row_id;
      
      // Get the created operation
      const selectQuery = `
        SELECT co.*, f.name as field_name, fm.name as farm_name
        FROM crop_operations co
        JOIN fields f ON co.field_id = f.id
        JOIN farms fm ON co.farm_id = fm.id
        WHERE co.id = ?
      `;
      
      const { results: newOperation } = await env.DB.prepare(selectQuery).bind(newOperationId).all();
      
      return new Response(JSON.stringify({
        message: 'Operation created successfully',
        operation: {
          ...newOperation[0],
          input_used: newOperation[0].input_used ? JSON.parse(newOperation[0].input_used) : null
        }
      }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
      });
      
    } else if (method === 'PUT') {
      // Update operation (mark as completed, update status, etc.)
      const body = await request.json();
      const { operation_id, status, completed_date, cost, notes } = body;
      
      if (!operation_id) {
        return new Response(JSON.stringify({ error: 'Operation ID required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      // Verify user has access to operation
      const accessQuery = `
        SELECT co.* FROM crop_operations co
        JOIN fields f ON co.field_id = f.id
        JOIN farms farm ON f.farm_id = farm.id
        JOIN farm_members fmem ON farm.id = fmem.farm_id
        WHERE co.id = ? AND fmem.user_id = ?
      `;
      
      const { results: operation } = await env.DB.prepare(accessQuery).bind(operation_id, userId).all();
      
      if (!operation || operation.length === 0) {
        return new Response(JSON.stringify({ error: 'Access denied or operation not found' }), {
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      // Update operation
      const updateFields = [];
      const params = [];
      
      if (status) {
        updateFields.push('status = ?');
        params.push(status);
      }
      
      if (completed_date) {
        updateFields.push('completed_date = ?');
        params.push(completed_date);
      }
      
      if (cost !== undefined) {
        updateFields.push('cost = ?');
        params.push(cost);
      }
      
      if (notes) {
        updateFields.push('notes = ?');
        params.push(notes);
      }
      
      updateFields.push('updated_at = datetime("now")');
      params.push(operation_id);
      
      const updateQuery = `
        UPDATE crop_operations 
        SET ${updateFields.join(', ')}
        WHERE id = ?
      `;
      
      const result = await env.DB.prepare(updateQuery).bind(...params).run();
      
      if (!result.success) {
        return new Response(JSON.stringify({ error: 'Failed to update operation' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      // Get updated operation
      const selectQuery = `
        SELECT co.*, f.name as field_name, fm.name as farm_name
        FROM crop_operations co
        JOIN fields f ON co.field_id = f.id
        JOIN farms fm ON co.farm_id = fm.id
        WHERE co.id = ?
      `;
      
      const { results: updatedOperation } = await env.DB.prepare(selectQuery).bind(operation_id).all();
      
      return new Response(JSON.stringify({
        message: 'Operation updated successfully',
        operation: {
          ...updatedOperation[0],
          input_used: updatedOperation[0].input_used ? JSON.parse(updatedOperation[0].input_used) : null
        }
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
      
    } else {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
  } catch (error) {
    console.error('Crop Operations API error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}