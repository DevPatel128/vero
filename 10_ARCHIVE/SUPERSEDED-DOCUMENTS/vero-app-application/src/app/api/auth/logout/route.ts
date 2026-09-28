import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  await supabase.auth.signOut();

  if (user) {
    const admin = createAdminClient();
    await admin.from("audit_logs").insert({
      user_id: user.id,
      actor_id: user.id,
      action: "user.logout",
      resource_type: "user",
      resource_id: user.id,
    });
  }

  return NextResponse.json({ ok: true });
}
