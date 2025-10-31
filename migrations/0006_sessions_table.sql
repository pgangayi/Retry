-- Create sessions table for refresh token rotation and session management (D1 compatible)
CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  refresh_token_hash TEXT NOT NULL,
  user_agent TEXT,
  ip_address TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_used_at DATETIME,
  revoked INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
