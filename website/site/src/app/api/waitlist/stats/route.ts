import { NextResponse } from "next/server";
import { waitlist } from "@/lib/waitlist";

export const runtime = "nodejs";

export async function GET() {
  const stats = await waitlist.stats();
  return NextResponse.json(stats, {
    headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" },
  });
}
