import { createClient, SupabaseClient } from "@supabase/supabase-js";
import crypto from "crypto";
import type {
  WaitlistEntry,
  WaitlistRole,
  WaitlistStats,
  WaitlistStore,
} from "./types";

function getClient(): SupabaseClient {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars.",
    );
  }
  return createClient(url, key);
}

function makeCode(): string {
  return crypto.randomBytes(4).toString("hex");
}

function makeToken(): string {
  return crypto.randomBytes(18).toString("base64url");
}

function makeId(): string {
  return "w_" + crypto.randomBytes(8).toString("hex");
}

function normEmail(e: string): string {
  return e.trim().toLowerCase();
}

function rowToEntry(row: Record<string, unknown>): WaitlistEntry {
  return {
    id: row.id as string,
    email: row.email as string,
    name: (row.name as string) || null,
    role: row.role as WaitlistRole,
    city: (row.city as string) || null,
    useCase: (row.use_case as string) || null,
    source: (row.source as string) || null,
    referredBy: (row.referred_by as string) || null,
    referralCode: row.referral_code as string,
    position: row.position as number,
    referralCount: row.referral_count as number,
    joinedAt: row.joined_at as string,
    token: row.token as string,
  };
}

export const supabaseStore: WaitlistStore = {
  async add(input) {
    const db = getClient();
    const email = normEmail(input.email);

    // Check for existing entry
    const { data: existing } = await db
      .from("waitlist")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (existing) {
      return { entry: rowToEntry(existing), created: false };
    }

    // Get next position
    const { count } = await db
      .from("waitlist")
      .select("*", { count: "exact", head: true });

    const position = (count ?? 0) + 1;

    const entry = {
      id: makeId(),
      email,
      name: input.name?.trim() || null,
      role: input.role,
      city: input.city?.trim() || null,
      use_case: input.useCase?.trim() || null,
      source: input.source?.trim() || null,
      referred_by: input.referredBy || null,
      referral_code: makeCode(),
      position,
      referral_count: 0,
      joined_at: new Date().toISOString(),
      token: makeToken(),
    };

    const { data, error } = await db
      .from("waitlist")
      .insert(entry)
      .select()
      .single();

    if (error) {
      throw new Error(`Supabase insert failed: ${error.message}`);
    }

    // Increment referrer's count if applicable
    if (input.referredBy) {
      const { data: referrer } = await db
        .from("waitlist")
        .select("referral_count")
        .eq("referral_code", input.referredBy)
        .maybeSingle();

      if (referrer) {
        await db
          .from("waitlist")
          .update({ referral_count: (referrer.referral_count ?? 0) + 1 })
          .eq("referral_code", input.referredBy);
      }
    }

    return { entry: rowToEntry(data), created: true };
  },

  async findByToken(token) {
    const db = getClient();
    const { data } = await db
      .from("waitlist")
      .select("*")
      .eq("token", token)
      .maybeSingle();
    return data ? rowToEntry(data) : null;
  },

  async findByEmail(email) {
    const db = getClient();
    const { data } = await db
      .from("waitlist")
      .select("*")
      .eq("email", normEmail(email))
      .maybeSingle();
    return data ? rowToEntry(data) : null;
  },

  async findByCode(code) {
    const db = getClient();
    const { data } = await db
      .from("waitlist")
      .select("*")
      .eq("referral_code", code)
      .maybeSingle();
    return data ? rowToEntry(data) : null;
  },

  async stats(): Promise<WaitlistStats> {
    const db = getClient();

    const { count: total } = await db
      .from("waitlist")
      .select("*", { count: "exact", head: true });

    const { count: workers } = await db
      .from("waitlist")
      .select("*", { count: "exact", head: true })
      .eq("role", "worker");

    const { count: businesses } = await db
      .from("waitlist")
      .select("*", { count: "exact", head: true })
      .eq("role", "business");

    return {
      total: total ?? 0,
      workers: workers ?? 0,
      businesses: businesses ?? 0,
    };
  },
};
