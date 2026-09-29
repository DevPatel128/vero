CREATE TABLE IF NOT EXISTS entries (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  role TEXT NOT NULL CHECK (role IN ('worker', 'business')),
  city TEXT,
  use_case TEXT,
  source TEXT,
  referred_by TEXT,
  referral_code TEXT NOT NULL UNIQUE,
  position INTEGER NOT NULL UNIQUE,
  referral_count INTEGER NOT NULL DEFAULT 0,
  joined_at TEXT NOT NULL,
  token TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS rate_limits (
  key TEXT NOT NULL,
  window_start INTEGER NOT NULL,
  count INTEGER NOT NULL,
  PRIMARY KEY (key, window_start)
);
