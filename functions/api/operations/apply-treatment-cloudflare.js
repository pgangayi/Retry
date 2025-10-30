// Cloudflare Pages Function wrapper for apply-treatment
// - Verifies incoming user JWT with Supabase `/auth/v1/user`
// - Calls Supabase PostgREST RPC `apply_treatment` with service_role key
// - Expects env vars: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SENTRY_DSN (optional)

// import * as Sentry from '@sentry/cloudflare';

export async function onRequest(context) {
  const { request, env } = context;
  const SUPABASE_URL = env.SUPABASE_URL;
  const SERVICE_ROLE = env.SUPABASE_SERVICE_ROLE_KEY;
  const SENTRY_DSN = env.SENTRY_DSN;

  // Temporarily disabled Sentry until proper Cloudflare integration is configured
  /*
  if (SENTRY_DSN) {
    Sentry.init({
      dsn: SENTRY_DSN,
      tracesSampleRate: 1.0,
      environment: env.NODE_ENV || 'production',
      beforeSend: (event) => {
        // Add request context
        event.tags = {
          ...event.tags,
          url: request.url,
          method: request.method
        };
        return event;
      }
    });
  }
  */

  try {
    if (!SUPABASE_URL || !SERVICE_ROLE) {
      throw new Error('Server misconfigured: missing Supabase credentials');
    }

    // Start Sentry transaction (disabled)
    // const transaction = SENTRY_DSN ? Sentry.startTransaction({
    //   name: 'apply-treatment',
    //   op: 'http.server'
    // }) : null;

    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Missing authorization header');
    }

    // Validate user token by calling Supabase auth user endpoint
    const userRes = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      method: 'GET',
      headers: { 'Authorization': authHeader }
    });

    if (!userRes.ok) {
      return new Response(JSON.stringify({ error: 'invalid token' }), { status: 401 });
    }
    const userJson = await userRes.json();
    const userId = userJson?.id;
    if (!userId) return new Response(JSON.stringify({ error: 'could not determine user id' }), { status: 401 });

    // Parse body and forward to RPC
    let payload;
    try {
      payload = await request.json();
    } catch (e) {
      return new Response(JSON.stringify({ error: 'invalid json' }), { status: 400 });
    }

    // Optional idempotency key from header
    const idempotencyKey = request.headers.get('Idempotency-Key') || null;

    // Prepare RPC call
    const rpcUrl = `${SUPABASE_URL}/rest/v1/rpc/apply_treatment`;
    const rpcBody = { payload: payload, user_id: userId, idempotency_key: idempotencyKey };

    const rpcRes = await fetch(rpcUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SERVICE_ROLE,
        'Authorization': `Bearer ${SERVICE_ROLE}`
      },
      body: JSON.stringify(rpcBody)
    });

    const rpcJson = await rpcRes.text();
    let responseBody;
    try {
      responseBody = JSON.parse(rpcJson);
    } catch (e) {
      responseBody = { error: 'invalid rpc response' };
    }

    // Map RPC errors to HTTP status codes
    let status = rpcRes.status;
    if (responseBody.error === 'insufficient_inventory') {
      status = 409;
    } else if (responseBody.error) {
      status = 400; // or 500 depending on error type
    }

    // If treatment was successful, trigger background processing
    if (status === 200 && responseBody.treatmentId) {
      // Fire and forget - don't wait for webhook response
      triggerTreatmentAppliedWebhook(env, {
        treatmentId: responseBody.treatmentId,
        farmId: payload.farmId,
        items: payload.items,
        appliedAt: payload.appliedAt,
        recordedBy: userId
      }).catch(err => console.error('Webhook trigger failed:', err));
    }

    // Basic logging (console for now; replace with Sentry)
    console.log(`apply-treatment: user=${userId}, status=${status}, idempotency=${idempotencyKey}`);

    // Finish Sentry transaction (disabled)
    // if (transaction) {
    //   transaction.setStatus(status < 400 ? 'ok' : 'error');
    //   transaction.finish();
    // }

    return new Response(JSON.stringify(responseBody), { status, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    // Finish Sentry transaction with error (disabled)
    // if (transaction) {
    //   transaction.setStatus('error');
    //   transaction.finish();
    // }

    // Temporarily disabled Sentry error capture
    /*
    if (SENTRY_DSN) {
      Sentry.captureException(error, {
        tags: {
          url: request.url,
          method: request.method
        },
        extra: {
          userId: userId || 'unknown',
          payload: payload ? JSON.stringify(payload) : 'none'
        }
      });
    }
    */
    console.error('apply-treatment error:', error);
    return new Response(JSON.stringify({ error: 'internal server error' }), { status: 500 });
  }
}

async function triggerTreatmentAppliedWebhook(env, data) {
  try {
    const webhookUrl = `${env.CF_PAGES_URL || 'http://localhost:8788'}/api/webhooks/events`;

    await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.WEBHOOK_SECRET}`
      },
      body: JSON.stringify({
        event: 'treatment.applied',
        data: data
      })
    });
  } catch (error) {
    console.error('Failed to trigger webhook:', error);
    // Don't throw - webhook failures shouldn't break the main operation
  }
}
