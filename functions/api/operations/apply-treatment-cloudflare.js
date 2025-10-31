// Cloudflare Pages Function wrapper for apply-treatment
// - Verifies incoming user JWT using local AuthUtils and D1
// - Calls local JS implementation `applyTreatment` which uses D1 (env.DB)
// - Expects env vars: JWT_SECRET, WEBHOOK_SECRET, SENTRY_DSN (optional)

// import * as Sentry from '@sentry/cloudflare';

import { AuthUtils } from '../_auth.js';
import { applyTreatment } from './apply-treatment.js';

export async function onRequest(context) {
  const { request, env } = context;
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
    // Use internal JWT validation (AuthUtils) and D1 for data
    const auth = new AuthUtils(env);
    const user = await auth.getUserFromToken(request);
    if (!user) return new Response(JSON.stringify({ error: 'invalid token' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    const userId = user.id;
    // Start Sentry transaction (disabled)
    // const transaction = SENTRY_DSN ? Sentry.startTransaction({
    //   name: 'apply-treatment',
    //   op: 'http.server'
    // }) : null;

    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Missing authorization header');
    }

    // Parse body
    let payload;
    try {
      payload = await request.json();
    } catch (e) {
      return new Response(JSON.stringify({ error: 'invalid json' }), { status: 400 });
    }

    // Optional idempotency key from header
    const idempotencyKey = request.headers.get('Idempotency-Key') || null;

    // Call shared applyTreatment implementation with D1 db
    const deps = {
      db: env.DB,
      userId,
      idempotencyKey,
      // optional idempotency hook: check operations table if present
      checkIdempotency: async (key) => {
        try {
          const { results } = await env.DB.prepare('SELECT response_body FROM operations WHERE idempotency_key = ? LIMIT 1').bind(key).all();
          if (results && results.length > 0) return JSON.parse(results[0].response_body);
          return null;
        } catch (e) {
          // Table might not exist in D1 schema; treat as no-op
          return null;
        }
      }
    };

    const result = await applyTreatment({ payload, deps });
    let status = result.status || 500;
    const responseBody = result.body || { error: 'internal' };

    // If treatment was successful, trigger background processing
    if (status === 200 && responseBody.treatmentId) {
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
