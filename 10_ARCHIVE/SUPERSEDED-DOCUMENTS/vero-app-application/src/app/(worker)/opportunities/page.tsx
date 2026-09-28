import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AppHeader } from "@/components/layout/app-header";
import { CAREER_PATHS, ZONES } from "@/lib/career-paths";

export const metadata = {
  title: "Opportunities",
};

interface PageProps {
  searchParams: Promise<{ careerPath?: string; zone?: string }>;
}

export default async function OpportunitiesPage({ searchParams }: PageProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const params = await searchParams;

  let query = supabase
    .from("opportunities")
    .select("id, title, description, career_path, zone, pay_type, pay_amount_paise, created_at")
    .eq("is_open", true)
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .limit(50);
  if (params.careerPath) query = query.eq("career_path", params.careerPath);
  if (params.zone) query = query.eq("zone", params.zone);

  const { data: opps } = await query;
  const role = (user.user_metadata?.role as "worker" | "business" | undefined) ?? "worker";

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader email={user.email} role={role} />
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12 md:px-12 md:py-16">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-2">
          03 / Opportunities
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">
          Open opportunities
        </h1>
        <p className="mt-2 max-w-[60ch] text-sm text-ink-2">
          No bidding. Apply once. Businesses choose by your record.
        </p>

        <form className="mt-10 flex flex-wrap gap-3 text-sm" method="get">
          <select
            name="careerPath"
            defaultValue={params.careerPath ?? ""}
            className="h-10 rounded-input border border-ink-3/30 bg-surface-1 px-3 text-ink-0 focus:outline-none"
          >
            <option value="">All career paths</option>
            {CAREER_PATHS.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.category} · {p.label}
              </option>
            ))}
          </select>
          <select
            name="zone"
            defaultValue={params.zone ?? ""}
            className="h-10 rounded-input border border-ink-3/30 bg-surface-1 px-3 text-ink-0 focus:outline-none"
          >
            <option value="">All zones</option>
            {ZONES.map((z) => (
              <option key={z.slug} value={z.slug}>{z.label}</option>
            ))}
          </select>
          <button
            type="submit"
            className="h-10 rounded-pill bg-ink-0 px-4 text-xs text-surface-0"
          >
            Filter
          </button>
          {(params.careerPath || params.zone) && (
            <Link
              href="/opportunities"
              className="flex items-center text-xs text-ink-2 hover:text-ink-0"
            >
              Clear filters
            </Link>
          )}
        </form>

        <ul className="mt-10 space-y-3">
          {(opps ?? []).length === 0 && (
            <li className="rounded-card border border-ink-3/20 bg-surface-1 p-8 text-center text-sm text-ink-2">
              No open opportunities match these filters yet. Check back soon.
            </li>
          )}
          {(opps ?? []).map((o) => {
            const path = CAREER_PATHS.find((p) => p.slug === o.career_path);
            const zone = ZONES.find((z) => z.slug === o.zone);
            return (
              <li key={o.id}>
                <Link
                  href={`/jobs/${o.id}`}
                  className="block rounded-card border border-ink-3/20 bg-surface-1 p-5 transition-colors hover:bg-surface-2"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-base font-medium">{o.title}</h2>
                      <p className="mt-2 line-clamp-2 text-sm text-ink-2">
                        {o.description}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2 text-xs text-ink-3">
                        {path && <span>{path.label}</span>}
                        {zone && <span>· {zone.label}</span>}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-sm text-ink-0">
                        ₹{(o.pay_amount_paise / 100).toLocaleString("en-IN")}
                      </p>
                      <p className="font-mono text-xs text-ink-3">
                        {o.pay_type.replace("_", " ")}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}
