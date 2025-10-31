import { AuthUtils } from '../_auth.js';

function parseRefreshCookie(request) {
  const cookie = request.headers.get('Cookie') || request.headers.get('cookie') || '';
  const match = cookie.split(';').map(s => s.trim()).find(s => s.startsWith('refresh='));
  if (!match) return null;
  const val = match.split('=')[1] || '';
  const dot = val.indexOf('.')
  if (dot === -1) return null;
  const sid = val.substring(0, dot);
  return sid;
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const auth = new AuthUtils(env);

  try {
    const sid = parseRefreshCookie(request);
    if (sid) {
      await auth.revokeSession(sid);
    }

    // Clear cookie
    return new Response(null, {
      status: 204,
      headers: {
        'Set-Cookie': `refresh=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`
      }
    });
  } catch (error) {
    console.error('Logout error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
