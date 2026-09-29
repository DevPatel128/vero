import { NextResponse } from "next/server";
import { waitlist } from "@/lib/waitlist";


export async function GET() {
  try {
    const stats = await waitlist.stats();
    return NextResponse.json(stats, {
      headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" },
    });
  } catch (err) {
    console.error("waitlist.stats error", err);
    return NextResponse.json(
      { error: "store_unavailable" },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
