import { AuthUtils } from '../_auth.js';

function parseRefreshCookie(request) {
  const cookie = request.headers.get('Cookie') || request.headers.get('cookie') || '';
  const match = cookie.split(';').map(s => s.trim()).find(s => s.startsWith('refresh='));
  if (!match) return null;
  const val = match.split('=')[1] || '';
  const dot = val.indexOf('.')
  if (dot === -1) return null;
  const sid = val.substring(0, dot);
  const token = val.substring(dot + 1);
  return { sid, token };
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const auth = new AuthUtils(env);

  try {
    const parsed = parseRefreshCookie(request);
    if (!parsed) {
      return new Response(JSON.stringify({ error: 'No refresh token' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }

    const { sid, token } = parsed;

    const verified = await auth.verifyRefreshToken(sid, token);
    if (!verified) {
      return new Response(JSON.stringify({ error: 'Invalid refresh token' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }

    // Rotate
    const newToken = (Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2));
    await auth.rotateRefreshToken(sid, newToken);

    // Issue new access token
    const accessToken = auth.generateAccessToken(verified.userId, null, sid, 60 * 15);

    // Set new cookie (sid.newToken)
    const refreshCookie = `${sid}.${newToken}`;

    // Return new access token
    return new Response(JSON.stringify({ accessToken }), {
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': `refresh=${refreshCookie}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${60 * 60 * 24 * 30}`
      }
    });

  } catch (error) {
    console.error('Refresh error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
