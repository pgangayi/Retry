import { AuthUtils } from '../_auth.js';

export async function onRequestPost(context) {
  const { request, env } = context;
  const auth = new AuthUtils(env);

  try {
    const body = await request.json();
    const { email, password, name } = body;

    if (!email || !password || !name) {
      return new Response(JSON.stringify({ error: 'Email, password, and name required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check if user already exists
    const { results: existingUsers } = await env.DB.prepare(
      'SELECT id FROM users WHERE email = ?'
    ).bind(email).run();

    if (existingUsers.length > 0) {
      return new Response(JSON.stringify({ error: 'User already exists' }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Hash password
    const passwordHash = await auth.hashPassword(password);

    // Generate user ID
    const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Create user in database
    await env.DB.prepare(
      'INSERT INTO users (id, email, name, password_hash) VALUES (?, ?, ?, ?)'
    ).bind(userId, email, name, passwordHash).run();

    // Create session and issue tokens
    const userAgent = request.headers.get('user-agent') || '';
    const ip = request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for') || '';
    const { sid, refreshToken } = await auth.createSession(userId, userAgent, ip);

    const accessToken = auth.generateAccessToken(userId, email, sid, 60 * 15); // 15m

    const user = {
      id: userId,
      email,
      name,
      created_at: new Date().toISOString()
    };

    const refreshCookie = `${sid}.${refreshToken}`;

    return new Response(JSON.stringify({
      user,
      accessToken,
      message: 'User created successfully'
    }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': `refresh=${refreshCookie}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${60 * 60 * 24 * 30}`
      }
    });

  } catch (error) {
    // Log internal error server-side and return a generic message to clients
    console.error('Signup error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}