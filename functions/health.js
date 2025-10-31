// Health check endpoint for monitoring
export async function onRequest(context) {
  const { env } = context;

  try {
    // Basic health checks
    const checks = {
      timestamp: new Date().toISOString(),
      status: 'healthy',
      checks: {}
    };

    // Check D1 database connection
    try {
      const { results } = await env.DB.prepare("SELECT 1 as health_check").all();
      checks.checks.database = results && results.length > 0 ? 'healthy' : 'unhealthy';
    } catch (error) {
      checks.checks.database = 'unhealthy';
    }

    // Check KV (if configured)
    if (env.RATE_LIMIT_KV) {
      try {
        await env.RATE_LIMIT_KV.put('health_check', 'ok', { expirationTtl: 60 });
        checks.checks.kv = 'healthy';
      } catch (error) {
        checks.checks.kv = 'unhealthy';
      }
    }

    // Determine overall status
    const allHealthy = Object.values(checks.checks).every(status => status === 'healthy');
    checks.status = allHealthy ? 'healthy' : 'degraded';

    return new Response(JSON.stringify(checks, null, 2), {
      headers: { 'Content-Type': 'application/json' },
      status: allHealthy ? 200 : 503
    });

  } catch (error) {
    return new Response(JSON.stringify({
      timestamp: new Date().toISOString(),
      status: 'unhealthy',
      error: error.message
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 503
    });
  }
}