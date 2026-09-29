import type { WaitlistEntry, WaitlistRole, WaitlistStats, WaitlistStore } from "./types";

type Row = {
  id: string;
  email: string;
  name: string | null;
  role: WaitlistRole;
  city: string | null;
  use_case: string | null;
  source: string | null;
  referred_by: string | null;
  referral_code: string;
  position: number;
  referral_count: number;
  joined_at: string;
  token: string;
};

function randomHex(bytes: number): string {
  const arr = new Uint8Array(bytes);
  crypto.getRandomValues(arr);
  return Array.from(arr, (b) => b.toString(16).padStart(2, "0")).join("");
}

function randomBase64url(bytes: number): string {
  const arr = new Uint8Array(bytes);
  crypto.getRandomValues(arr);
  return btoa(String.fromCharCode(...arr))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function normEmail(e: string): string {
  return e.trim().toLowerCase();
}

function toEntry(r: Row): WaitlistEntry {
  return {
    id: r.id,
    email: r.email,
    name: r.name,
    role: r.role,
    city: r.city,
    useCase: r.use_case,
    source: r.source,
    referredBy: r.referred_by,
    referralCode: r.referral_code,
    position: r.position,
    referralCount: r.referral_count,
    joinedAt: r.joined_at,
    token: r.token,
  };
}

async function findOne(db: D1Database, column: "email" | "token" | "referral_code", value: string) {
  const row = await db.prepare(`SELECT * FROM entries WHERE ${column} = ?`).bind(value).first<Row>();
  return row ? toEntry(row) : null;
}

export function d1Store(db: D1Database): WaitlistStore {
  return {
    async add(input) {
      const email = normEmail(input.email);

      // The UNIQUE(email) constraint is the atomic claim: a losing request
      // inserts nothing and reads the winner's row. Position is assigned
      // inside the same statement, and D1 runs statements serially, so two
      // signups can never receive the same position.
      for (let attempt = 0; attempt < 3; attempt++) {
        const id = "w_" + randomHex(8);
        const code = randomHex(4);
        const token = randomBase64url(18);
        try {
          const res = await db
            .prepare(
              `INSERT INTO entries
                 (id, email, name, role, city, use_case, source, referred_by, referral_code, position, referral_count, joined_at, token)
               SELECT ?, ?, ?, ?, ?, ?, ?, ?, ?, COALESCE(MAX(position), 0) + 1, 0, ?, ? FROM entries WHERE true
               ON CONFLICT(email) DO NOTHING`,
            )
            .bind(
              id,
              email,
              input.name?.trim() || null,
              input.role,
              input.city?.trim() || null,
              input.useCase?.trim() || null,
              input.source?.trim() || null,
              input.referredBy || null,
              code,
              new Date().toISOString(),
              token,
            )
            .run();

          const created = (res.meta.changes ?? 0) > 0;
          const entry = await findOne(db, "email", email);
          if (!entry) throw new Error("waitlist: entry missing after insert");

          if (created && input.referredBy) {
            await db
              .prepare("UPDATE entries SET referral_count = referral_count + 1 WHERE referral_code = ?")
              .bind(input.referredBy)
              .run();
          }
          return { entry, created };
        } catch (err) {
          // A random code/token/position collision on another UNIQUE column:
          // retry with fresh values. Anything else is a real failure.
          const msg = err instanceof Error ? err.message : "";
          if (!/UNIQUE constraint failed/i.test(msg) || attempt === 2) throw err;
        }
      }
      throw new Error("waitlist: could not create entry");
    },

    findByToken: (token) => findOne(db, "token", token),
    findByEmail: (email) => findOne(db, "email", normEmail(email)),
    findByCode: (code) => findOne(db, "referral_code", code),

    async stats(): Promise<WaitlistStats> {
      const rows = await db
        .prepare("SELECT role, COUNT(*) AS n FROM entries GROUP BY role")
        .all<{ role: WaitlistRole; n: number }>();
      let workers = 0;
      let businesses = 0;
      for (const r of rows.results) {
        if (r.role === "worker") workers = r.n;
        else businesses = r.n;
      }
      return { total: workers + businesses, workers, businesses };
    },

    async health() {
      try {
        await db.prepare("SELECT 1 FROM entries LIMIT 1").first();
        return true;
      } catch {
        return false;
      }
    },
  };
}
