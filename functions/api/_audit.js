// Audit logging middleware for Pages Functions
// Logs operational mutations to audit_logs table

// Helper function to extract farm_id from various entity types
export function extractFarmId(entityType, entityData) {
  switch (entityType) {
    case 'farm':
      return entityData.id;
    case 'field':
    case 'animal':
    case 'task':
    case 'inventory_item':
    case 'treatment':
      return entityData.farm_id;
    default:
      return undefined;
  }
}

export async function logAuditEvent(env, entry) {
  try {
    const stmt = env.DB.prepare(`
      INSERT INTO audit_logs (farm_id, user_id, action, entity_type, entity_id, changes, ip_address, user_agent, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
    `);

    await stmt.bind(
      entry.farm_id,
      entry.user_id,
      entry.action,
      entry.entity_type,
      entry.entity_id,
      entry.changes ? JSON.stringify(entry.changes) : null,
      entry.ip_address,
      entry.user_agent
    ).run();
  } catch (error) {
    console.error('Failed to log audit event:', error);
    // Don't throw - audit logging failures shouldn't break operations
  }
}

// Middleware wrapper for Pages Functions
export function withAuditLogging(handler) {
  return async (context) => {
    const { request, env } = context;
    const url = new URL(request.url);
    const method = request.method;

    // Extract user info if available
    let userId;
    try {
      const authHeader = request.headers.get('Authorization');
      if (authHeader?.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        // TODO: Implement JWT verification for Cloudflare auth
        // For now, we'll skip user extraction
        userId = null;
      }
    } catch (error) {
      // Ignore auth errors for logging
    }

    // Call the original handler
    const response = await handler(context);

    // Log audit events for mutations
    if (userId && (method === 'POST' || method === 'PATCH' || method === 'DELETE')) {
      try {
        const pathParts = url.pathname.split('/').filter(Boolean);
        if (pathParts.length >= 2 && pathParts[0] === 'api') {
          const entityType = pathParts[1]; // e.g., 'farms', 'animals', 'tasks'
          const action = method === 'POST' ? 'create' :
                        method === 'PATCH' ? 'update' : 'delete';

          // For simplicity, log basic info - in production you'd want more detailed change tracking
          await logAuditEvent(env, {
            user_id: userId,
            action,
            entity_type: entityType,
            ip_address: request.headers.get('CF-Connecting-IP') || request.headers.get('X-Forwarded-For'),
            user_agent: request.headers.get('User-Agent')
          });
        }
      } catch (error) {
        console.error('Audit logging failed:', error);
      }
    }

    return response;
  };
}