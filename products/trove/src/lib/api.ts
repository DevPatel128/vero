import "server-only";
import { NextResponse } from "next/server";
import { ZodError, type ZodSchema } from "zod";
import { limit } from "@/lib/rate-limit";
import { createClient } from "@/lib/supabase/server";

export type ApiError = { code: string; message: string; details?: unknown };

export function jsonError(code: string, message: string, status = 400, details?: unknown) {
  return NextResponse.json({ error: { code, message, details } satisfies ApiError }, { status });
}

export async function requireApiUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function withRateLimit(key: "api" | "ai" | "auth" | "email", identifier: string) {
  const r = await limit(key, identifier);
  if (!r.success) {
    return jsonError("rate_limited", "Too many requests. Slow down.", 429, { reset: r.reset });
  }
  return null;
}

export async function validate<T>(schema: ZodSchema<T>, req: Request): Promise<{ data: T } | { error: NextResponse }> {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return { error: jsonError("invalid_json", "Body must be valid JSON.") };
  }
  try {
    return { data: schema.parse(json) };
  } catch (err) {
    if (err instanceof ZodError) {
      return { error: jsonError("validation_error", "Request body failed validation.", 422, err.flatten()) };
    }
    throw err;
  }
}
