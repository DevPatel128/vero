import "server-only";
import { createAdminClient } from "@/lib/supabase/server";

interface AuditInput {
  userId?: string | null;
  action: string;
  resourceType: string;
  resourceId?: string | null;
  metadata?: Record<string, unknown>;
  ip?: string | null;
  userAgent?: string | null;
}

export async function audit(input: AuditInput) {
  try {
    const client = createAdminClient();
    await client.from("audit_logs").insert({
      user_id: input.userId ?? null,
      action: input.action,
      resource_type: input.resourceType,
      resource_id: input.resourceId ?? null,
      metadata: input.metadata ?? {},
      ip: input.ip ?? null,
      user_agent: input.userAgent ?? null,
    });
  } catch (err) {
    console.error("[audit] failed", err);
  }
}
