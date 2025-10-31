import { AuthUtils } from '../_auth.js';

export async function onRequestPost(context) {
  const { request, env } = context;
  const auth = new AuthUtils(env);

  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Email and password required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get user from database
    const { results } = await env.DB.prepare(
      'SELECT id, email, name, password_hash, created_at FROM users WHERE email = ?'
    ).bind(email).run();

    if (results.length === 0) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const user = results[0];

    // Verify password
    const isValidPassword = await auth.verifyPassword(password, user.password_hash);
    if (!isValidPassword) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Create session and issue tokens
    const userAgent = request.headers.get('user-agent') || '';
    const ip = request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for') || '';
    const { sid, refreshToken } = await auth.createSession(user.id, userAgent, ip);

    const accessToken = auth.generateAccessToken(user.id, user.email, sid, 60 * 15); // 15m

    // Set refresh token cookie (sid.token) — server manages rotation
    const refreshCookie = `${sid}.${refreshToken}`;

    const { password_hash, ...userWithoutPassword } = user;
    return new Response(JSON.stringify({
      user: userWithoutPassword,
      accessToken,
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': `refresh=${refreshCookie}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${60 * 60 * 24 * 30}`
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}