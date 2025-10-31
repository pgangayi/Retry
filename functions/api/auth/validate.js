import { AuthUtils } from '../_auth.js';

export async function onRequestGet(context) {
  const { request, env } = context;
  const auth = new AuthUtils(env);

  try {
    const user = await auth.getUserFromToken(request);

    if (!user) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ user }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Token validation error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}