-- Waitlist table for Vero pre-launch signups
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor → New Query)

CREATE TABLE IF NOT EXISTS waitlist (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  role TEXT NOT NULL CHECK (role IN ('worker', 'business')),
  city TEXT,
  use_case TEXT,
  source TEXT,
  referred_by TEXT,
  referral_code TEXT UNIQUE NOT NULL,
  position INTEGER NOT NULL,
  referral_count INTEGER NOT NULL DEFAULT 0,
  joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  token TEXT UNIQUE NOT NULL
);

-- Indexes for lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist (email);
CREATE INDEX IF NOT EXISTS idx_waitlist_token ON waitlist (token);
CREATE INDEX IF NOT EXISTS idx_waitlist_referral_code ON waitlist (referral_code);
CREATE INDEX IF NOT EXISTS idx_waitlist_role ON waitlist (role);

-- Row-level security: only service-role key can read/write
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- No public access — all operations go through service role key
-- (The website's API routes use SUPABASE_SERVICE_ROLE_KEY, not the anon key)
