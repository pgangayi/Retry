// Cloudflare Authentication Utilities
// JWT and password utilities for Cloudflare Workers (Cloudflare D1 + custom JWT)

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Minimal crypto-safe random string generator for session ids and JTIs
function randomString(len = 32) {
  try {
    const array = new Uint8Array(len);
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      crypto.getRandomValues(array);
      return Array.from(array).map((b) => b.toString(16).padStart(2, '0')).join('').slice(0, len);
    }
  } catch (e) {
    // fallback
  }
  return Math.random().toString(36).substring(2, 2 + len);
}

export class AuthUtils {
  constructor(env) {
    this.env = env;
  }

  // Hash a password
  async hashPassword(password) {
    const saltRounds = 12;
    return bcrypt.hash(password, saltRounds);
  }

  // Verify a password
  async verifyPassword(password, hash) {
    return bcrypt.compare(password, hash);
  }

  // Generate JWT token
  // Generate an access JWT. Accepts optional session id (sid) and ttl in seconds
  generateAccessToken(userId, email, sid = null, ttlSeconds = 60 * 15) {
    const payload = {
      userId,
      email,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + ttlSeconds,
      jti: `jti_${randomString(8)}`,
    };

    if (sid) payload.sid = sid;

    return jwt.sign(payload, this.env.JWT_SECRET);
  }

  // Verify JWT token
  verifyToken(token) {
    try {
      return jwt.verify(token, this.env.JWT_SECRET);
    } catch (error) {
      return null;
    }
  }

  // Extract token from Authorization header
  extractToken(request) {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    return authHeader.substring(7);
  }

  // Get user from token
  async getUserFromToken(request) {
    const token = this.extractToken(request);
    if (!token) return null;

    const payload = this.verifyToken(token);
    if (!payload) return null;

    // If token has a session id, verify session is not revoked
    if (payload.sid) {
      try {
        const { results: sess } = await this.env.DB.prepare(
          'SELECT revoked FROM sessions WHERE id = ?'
        ).bind(payload.sid).run();

        if (!sess || sess.length === 0) return null;
        if (sess[0].revoked) return null;
      } catch (e) {
        // If sessions table doesn't exist yet, fallback to token-only auth
        // (migration phase). Do not crash.
      }
    }

    // Get user from database
    const { results } = await this.env.DB.prepare(
      'SELECT id, email, name, created_at FROM users WHERE id = ?'
    ).bind(payload.userId).run();

    return results.length > 0 ? results[0] : null;
  }

  // Create a new session row and return { sid, refreshToken }
  async createSession(userId, userAgent = '', ip = '') {
    const sid = `sid_${Date.now()}_${randomString(6)}`;
    const refreshToken = randomString(64);
    const refreshHash = await bcrypt.hash(refreshToken, 10);

    await this.env.DB.prepare(
      'INSERT INTO sessions (id, user_id, refresh_token_hash, user_agent, ip_address, created_at) VALUES (?, ?, ?, ?, ?, datetime("now"))'
    ).bind(sid, userId, refreshHash, userAgent, ip).run();

    return { sid, refreshToken };
  }

  // Verify a presented refresh token against stored hash for a session
  async verifyRefreshToken(sid, token) {
    try {
      const { results } = await this.env.DB.prepare(
        'SELECT refresh_token_hash, revoked, user_id FROM sessions WHERE id = ?'
      ).bind(sid).run();

      if (!results || results.length === 0) return null;

      const row = results[0];
      if (row.revoked) return null;

      const ok = await bcrypt.compare(token, row.refresh_token_hash);
      return ok ? { userId: row.user_id } : null;
    } catch (e) {
      return null;
    }
  }

  // Rotate refresh token for a session (replace stored hash)
  async rotateRefreshToken(sid, newToken) {
    const newHash = await bcrypt.hash(newToken, 10);
    await this.env.DB.prepare(
      'UPDATE sessions SET refresh_token_hash = ?, last_used_at = datetime("now") WHERE id = ?'
    ).bind(newHash, sid).run();
  }

  // Revoke a session by id
  async revokeSession(sid) {
    await this.env.DB.prepare('UPDATE sessions SET revoked = 1 WHERE id = ?').bind(sid).run();
  }
}