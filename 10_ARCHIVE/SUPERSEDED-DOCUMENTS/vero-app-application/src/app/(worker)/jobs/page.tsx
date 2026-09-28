import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AppHeader } from "@/components/layout/app-header";

export const metadata = {
  title: "Your jobs",
};

export default async function WorkerJobsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const role = (user.user_metadata?.role as "worker" | "business" | undefined) ?? "worker";

  const { data: bookings } = await supabase
    .from("bookings")
    .select(`
      id, status, pay_amount_paise, opportunity_id, completed_at,
      opportunities (title, career_path)
    `)
    .eq("worker_id", user.id)
    .order("created_at", { ascending: false })
    .limit(100);

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader email={user.email} role={role} />
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12 md:px-12 md:py-16">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-2">
          Your jobs
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">
          Applications and active work
        </h1>

        <section className="mt-12">
          {(bookings ?? []).length === 0 ? (
            <p className="text-sm text-ink-2">
              No applications yet.{" "}
              <Link href="/opportunities" className="text-ink-0 underline-offset-4 hover:underline">
                Browse opportunities
              </Link>
              .
            </p>
          ) : (
            <ul className="space-y-3">
              {(bookings ?? []).map((b: any) => (
                <li key={b.id}>
                  <Link
                    href={`/jobs/${b.opportunity_id}`}
                    className="flex items-center justify-between rounded-card border border-ink-3/20 bg-surface-1 p-5 transition-colors hover:bg-surface-2"
                  >
                    <div>
                      <p className="text-sm font-medium">
                        {b.opportunities?.title ?? "Job"}
                      </p>
                      <p className="mt-1 font-mono text-xs capitalize text-ink-2">
                        {b.status.replace("_", " ")}
                      </p>
                    </div>
                    <p className="font-mono text-sm">
                      ₹{(b.pay_amount_paise / 100).toLocaleString("en-IN")}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
