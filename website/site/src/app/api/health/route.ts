import { NextResponse } from "next/server";
import { waitlist } from "@/lib/waitlist";

export const runtime = "nodejs";

/**
 * Liveness check for the waitlist store. No user data is read or returned.
 */
export async function GET() {
  const ok = await waitlist.health();
  return NextResponse.json(
    { ok },
    {
      status: ok ? 200 : 503,
      headers: { "Cache-Control": "no-store" },
    },
  );
}
