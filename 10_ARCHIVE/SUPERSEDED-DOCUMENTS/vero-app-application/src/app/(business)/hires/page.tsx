import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AppHeader } from "@/components/layout/app-header";
import { CAREER_PATHS } from "@/lib/career-paths";

export const metadata = {
  title: "Hires",
};

export default async function HiresPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const role = (user.user_metadata?.role as "worker" | "business" | undefined) ?? "worker";
  if (role !== "business") redirect("/dashboard");

  const { data: opps } = await supabase
    .from("opportunities")
    .select("id, title, career_path, is_open, created_at, pay_amount_paise")
    .eq("business_id", user.id)
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .limit(50);

  const { data: bookings } = await supabase
    .from("bookings")
    .select(`
      id, status, pay_amount_paise, completed_at,
      opportunities (title)
    `)
    .eq("business_id", user.id)
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader email={user.email} role={role} />
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12 md:px-12 md:py-16">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-2">
          05 / Hires
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">Hires</h1>

        <section className="mt-12">
          <h2 className="text-xs font-medium uppercase tracking-[0.15em] text-ink-2 mb-4">
            Your opportunities
          </h2>
          {(opps ?? []).length === 0 ? (
            <p className="text-sm text-ink-2">
              No opportunities yet.{" "}
              <Link href="/post-job" className="text-ink-0 underline-offset-4 hover:underline">
                Post your first job
              </Link>
              .
            </p>
          ) : (
            <ul className="space-y-3">
              {(opps ?? []).map((o) => (
                <li key={o.id}>
                  <Link
                    href={`/jobs/${o.id}`}
                    className="flex items-center justify-between rounded-card border border-ink-3/20 bg-surface-1 p-5 transition-colors hover:bg-surface-2"
                  >
                    <div>
                      <p className="text-sm font-medium">{o.title}</p>
                      <p className="mt-1 text-xs text-ink-2">
                        {CAREER_PATHS.find((p) => p.slug === o.career_path)?.label ?? "—"} ·{" "}
                        {o.is_open ? "Open" : "Closed"}
                      </p>
                    </div>
                    <p className="font-mono text-sm">
                      ₹{(o.pay_amount_paise / 100).toLocaleString("en-IN")}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="mt-16">
          <h2 className="text-xs font-medium uppercase tracking-[0.15em] text-ink-2 mb-4">
            All bookings
          </h2>
          {(bookings ?? []).length === 0 ? (
            <p className="text-sm text-ink-2">No bookings yet.</p>
          ) : (
            <ul className="space-y-2">
              {(bookings ?? []).map((b: any) => (
                <li
                  key={b.id}
                  className="flex items-center justify-between rounded-card border border-ink-3/20 bg-surface-1 px-5 py-4 text-sm"
                >
                  <span>{b.opportunities?.title ?? "Job"}</span>
                  <span className="flex items-center gap-4">
                    <span className="font-mono text-xs capitalize text-ink-2">
                      {b.status.replace("_", " ")}
                    </span>
                    <span className="font-mono text-xs">
                      ₹{(b.pay_amount_paise / 100).toLocaleString("en-IN")}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
