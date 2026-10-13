PRAGMA defer_foreign_keys=TRUE;
CREATE TABLE entries (id TEXT PRIMARY KEY, email TEXT NOT NULL UNIQUE, name TEXT, role TEXT NOT NULL CHECK (role IN ('worker', 'business')), city TEXT, use_case TEXT, source TEXT, referred_by TEXT, referral_code TEXT NOT NULL UNIQUE, position INTEGER NOT NULL UNIQUE, referral_count INTEGER NOT NULL DEFAULT 0, joined_at TEXT NOT NULL, token TEXT NOT NULL UNIQUE);
CREATE TABLE rate_limits (key TEXT NOT NULL, window_start INTEGER NOT NULL, count INTEGER NOT NULL, PRIMARY KEY (key, window_start));
INSERT INTO "rate_limits" ("key","window_start","count") VALUES('join:2409:40f2:1034:e6fc:20ba:e041:cab0:9d0c',1790659200,2);
