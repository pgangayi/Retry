import { AuthUtils } from '../_auth.js';

async function extractTokenFromRequest(request) {
  try {
    const body = await request.json().catch(() => null);
    if (body && body.token) return body.token;
  } catch (e) {
    // ignore
  }
  const authHeader = request.headers.get('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) return authHeader.substring(7);
  return null;
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const auth = new AuthUtils(env);

  try {
    const token = await extractTokenFromRequest(request);
    if (!token) {
      return new Response(JSON.stringify({ error: 'No token provided' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    // Verify legacy token
    const payload = auth.verifyToken(token);
    if (!payload || !payload.userId) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }

    // Confirm user exists
    const { results } = await env.DB.prepare('SELECT id, email FROM users WHERE id = ?').bind(payload.userId).run();
    if (!results || results.length === 0) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }

    const user = results[0];

    // Create session and issue new tokens
    const userAgent = request.headers.get('user-agent') || '';
    const ip = request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for') || '';
    const { sid, refreshToken } = await auth.createSession(user.id, userAgent, ip);
    const accessToken = auth.generateAccessToken(user.id, user.email, sid, 60 * 15);

    const refreshCookie = `${sid}.${refreshToken}`;

    return new Response(JSON.stringify({ accessToken, migrated: true }), {
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': `refresh=${refreshCookie}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${60 * 60 * 24 * 30}`
      }
    });

  } catch (error) {
    console.error('Migrate error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
