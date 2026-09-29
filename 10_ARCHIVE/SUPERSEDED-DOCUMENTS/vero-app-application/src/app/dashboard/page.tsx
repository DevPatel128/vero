import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { AppHeader } from "@/components/layout/app-header";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const role =
    (user.user_metadata?.role as "worker" | "business" | undefined) ?? "worker";
  const fullName = user.user_metadata?.full_name ?? "there";

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  const profileComplete = !!profile?.career_path;
  const emailVerified = !!user.email_confirmed_at;

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader email={user.email} role={role} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12 md:px-12 md:py-16">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-2">
          Welcome
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">
          {fullName}
        </h1>

        <section className="mt-12">
          <h2 className="text-xs font-medium uppercase tracking-[0.15em] text-ink-2 mb-4">
            Next steps
          </h2>
          <div className="grid gap-3">
            {!emailVerified && (
              <div className="rounded-card border border-accent/40 bg-surface-1 p-5">
                <h3 className="text-sm font-medium">Verify your email</h3>
                <p className="mt-1 text-sm text-ink-2">
                  Check your inbox for the verification link.
                </p>
              </div>
            )}

            {role === "worker" && !profileComplete && (
              <Link
                href="/profile"
                className="rounded-card border border-ink-3/20 bg-surface-1 p-5 transition-colors hover:bg-surface-2"
              >
                <h3 className="text-sm font-medium">Complete your profile</h3>
                <p className="mt-1 text-sm text-ink-2">
                  Set your career path, skills, and portfolio.
                </p>
              </Link>
            )}

            {role === "worker" && profileComplete && (
              <Link
                href="/opportunities"
                className="rounded-card border border-ink-3/20 bg-surface-1 p-5 transition-colors hover:bg-surface-2"
              >
                <h3 className="text-sm font-medium">Browse opportunities</h3>
                <p className="mt-1 text-sm text-ink-2">
                  Open jobs in your category and city zone.
                </p>
              </Link>
            )}

            {role === "business" && (
              <Link
                href="/post-job"
                className="rounded-card border border-ink-3/20 bg-surface-1 p-5 transition-colors hover:bg-surface-2"
              >
                <h3 className="text-sm font-medium">Post a job</h3>
                <p className="mt-1 text-sm text-ink-2">
                  Hire from a pool whose record is already verified.
                </p>
              </Link>
            )}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-xs font-medium uppercase tracking-[0.15em] text-ink-2 mb-4">
            Your record
          </h2>
          <div className="rounded-panel border border-ink-3/20 bg-surface-1 p-8 text-center">
            <p className="font-mono text-2xl">0</p>
            <p className="mt-2 text-sm text-ink-2">
              Signed work records. Yours forever.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
