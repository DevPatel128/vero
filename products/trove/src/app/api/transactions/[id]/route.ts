import { type NextRequest } from "next/server";
import { z } from "zod";
import { jsonError, requireApiUser, validate, withRateLimit } from "@/lib/api";
import { createClient } from "@/lib/supabase/server";
import { audit } from "@/lib/audit";

const patchSchema = z.object({
  amount: z.number().positive().optional(),
  merchant: z.string().min(1).max(120).optional(),
  description: z.string().max(500).optional(),
  category: z.string().min(1).max(40).optional(),
  direction: z.enum(["debit", "credit"]).optional(),
  occurred_at: z.string().datetime().optional(),
  tags: z.array(z.string().max(30)).max(10).optional(),
  notes: z.string().max(1000).optional(),
}).strict();

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await requireApiUser();
  if (!user) return jsonError("unauthorized", "Sign in required.", 401);
  const { id } = await params;
  const rl = await withRateLimit("api", user.id); if (rl) return rl;
  const parsed = await validate(patchSchema, req); if ("error" in parsed) return parsed.error;

  const supabase = await createClient();
  const { data, error } = await supabase.from("transactions").update(parsed.data).eq("id", id).eq("user_id", user.id).select().single();
  if (error) return jsonError("db_error", error.message, 500);
  await audit({ userId: user.id, action: "transaction.update", resourceType: "transaction", resourceId: id });
  return Response.json(data);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await requireApiUser();
  if (!user) return jsonError("unauthorized", "Sign in required.", 401);
  const { id } = await params;
  const rl = await withRateLimit("api", user.id); if (rl) return rl;
  const supabase = await createClient();
  const { error } = await supabase.from("transactions").delete().eq("id", id).eq("user_id", user.id);
  if (error) return jsonError("db_error", error.message, 500);
  await audit({ userId: user.id, action: "transaction.delete", resourceType: "transaction", resourceId: id });
  return new Response(null, { status: 204 });
}
