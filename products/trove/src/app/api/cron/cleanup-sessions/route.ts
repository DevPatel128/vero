import { type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) return new Response("unauthorized", { status: 401 });
  // Supabase Auth handles refresh-token rotation internally.
  // This endpoint is a placeholder for future session-purge logic and uptime checks.
  return Response.json({ cleaned: 0 });
}
