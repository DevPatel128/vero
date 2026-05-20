import { type NextRequest } from "next/server";
import { z } from "zod";
import { jsonError, requireApiUser, validate, withRateLimit } from "@/lib/api";
import { createClient } from "@/lib/supabase/server";
import { audit } from "@/lib/audit";
import { classify } from "@/lib/categories";

const createSchema = z.object({
  amount: z.number().positive().max(1_000_000_000),
  merchant: z.string().min(1).max(120),
  description: z.string().max(500).optional(),
  category: z.string().min(1).max(40).optional(),
  direction: z.enum(["debit", "credit"]).default("debit"),
  occurred_at: z.string().datetime(),
  account_id: z.string().uuid().optional(),
  tags: z.array(z.string().max(30)).max(10).optional(),
  notes: z.string().max(1000).optional(),
});

export async function GET(req: NextRequest) {
  const user = await requireApiUser();
  if (!user) return jsonError("unauthorized", "Sign in required.", 401);

  const rl = await withRateLimit("api", user.id);
  if (rl) return rl;

  const url = new URL(req.url);
  const limit = Math.min(Number(url.searchParams.get("limit") ?? 50), 200);
  const page = Math.max(Number(url.searchParams.get("page") ?? 1), 1);
  const category = url.searchParams.get("category");
  const direction = url.searchParams.get("direction");
  const search = url.searchParams.get("search");

  const supabase = await createClient();
  let q = supabase.from("transactions").select("*", { count: "exact" }).order("occurred_at", { ascending: false });
  if (category) q = q.eq("category", category);
  if (direction === "debit" || direction === "credit") q = q.eq("direction", direction);
  if (search) q = q.ilike("merchant", `%${search}%`);

  const { data, count, error } = await q.range((page - 1) * limit, page * limit - 1);
  if (error) return jsonError("db_error", error.message, 500);
  return Response.json({ data, page, limit, total: count ?? 0 });
}

export async function POST(req: NextRequest) {
  const user = await requireApiUser();
  if (!user) return jsonError("unauthorized", "Sign in required.", 401);

  const rl = await withRateLimit("api", user.id);
  if (rl) return rl;

  const parsed = await validate(createSchema, req);
  if ("error" in parsed) return parsed.error;
  const body = parsed.data;

  const supabase = await createClient();
  const category = body.category ?? classify(body.merchant, body.description);

  const { data, error } = await supabase.from("transactions").insert({
    user_id: user.id,
    amount: body.amount,
    merchant: body.merchant,
    description: body.description ?? null,
    category,
    direction: body.direction,
    occurred_at: body.occurred_at,
    account_id: body.account_id ?? null,
    tags: body.tags ?? [],
    notes: body.notes ?? null,
  }).select().single();
  if (error) return jsonError("db_error", error.message, 500);

  await audit({ userId: user.id, action: "transaction.create", resourceType: "transaction", resourceId: data.id });
  return Response.json(data, { status: 201 });
}
