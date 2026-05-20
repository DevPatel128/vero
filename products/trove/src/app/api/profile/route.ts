import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { jsonError, requireApiUser, withRateLimit } from "@/lib/api";
import { createClient } from "@/lib/supabase/server";
import { audit } from "@/lib/audit";

const schema = z.object({
  full_name: z.string().min(1).max(80),
});

export async function POST(req: NextRequest) {
  const user = await requireApiUser();
  if (!user) return jsonError("unauthorized", "Sign in required.", 401);
  const rl = await withRateLimit("api", user.id); if (rl) return rl;

  const formData = await req.formData();
  const parsed = schema.safeParse({ full_name: String(formData.get("full_name") ?? "") });
  if (!parsed.success) return jsonError("validation_error", "Invalid name.", 422);

  const supabase = await createClient();
  await supabase.from("profiles").update({ full_name: parsed.data.full_name }).eq("id", user.id);
  await audit({ userId: user.id, action: "profile.update", resourceType: "profile", resourceId: user.id });

  return NextResponse.redirect(new URL("/settings/profile?saved=1", req.url), { status: 303 });
}
