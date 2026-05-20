import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "trove",
    version: process.env.npm_package_version ?? "2.0.0",
    timestamp: new Date().toISOString(),
  });
}
