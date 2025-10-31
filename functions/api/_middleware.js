// Authentication middleware for Cloudflare Workers
import { AuthUtils } from './_auth.js';

export async function withAuth(handler) {
  return async (context) => {
    const { request, env } = context;
    const auth = new AuthUtils(env);

    try {
      const user = await auth.getUserFromToken(request);

      if (!user) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Add user to context
      context.user = user;

      return handler(context);
    } catch (error) {
      console.error('Auth middleware error:', error);
      return new Response(JSON.stringify({ error: 'Internal server error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  };
}