import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AppHeader } from "@/components/layout/app-header";
import { ApplyButton } from "@/components/jobs/apply-button";
import { BookingActions } from "@/components/jobs/booking-actions";
import { CAREER_PATHS, ZONES } from "@/lib/career-paths";

export const metadata = {
  title: "Opportunity",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function JobPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const role = (user.user_metadata?.role as "worker" | "business" | undefined) ?? "worker";

  // Treat id as opportunity_id first, then booking_id
  const { data: opp } = await supabase
    .from("opportunities")
    .select("id, business_id, title, description, career_path, zone, pay_type, pay_amount_paise, is_open")
    .eq("id", id)
    .maybeSingle();

  if (!opp) notFound();

  const path = CAREER_PATHS.find((p) => p.slug === opp.career_path);
  const zone = ZONES.find((z) => z.slug === opp.zone);

  // For business owner — list applicants
  let applicants: Array<{
    id: string;
    worker_id: string;
    status: string;
    worker_signed_at: string | null;
    business_signed_at: string | null;
    display_name: string | null;
    full_name: string;
    career_path: string | null;
    signed_jobs_count: number;
  }> = [];

  // For worker — their own booking on this opportunity
  let myBooking: {
    id: string;
    status: string;
    worker_signed_at: string | null;
    business_signed_at: string | null;
  } | null = null;

  if (opp.business_id === user.id) {
    const { data } = await supabase
      .from("bookings")
      .select(`
        id, worker_id, status, worker_signed_at, business_signed_at,
        profiles!bookings_worker_id_fkey (display_name, full_name, career_path),
        trust_scores!bookings_worker_id_fkey (signed_jobs_count)
      `)
      .eq("opportunity_id", opp.id)
      .order("created_at", { ascending: false });

    applicants = (data ?? []).map((b: any) => ({
      id: b.id,
      worker_id: b.worker_id,
      status: b.status,
      worker_signed_at: b.worker_signed_at,
      business_signed_at: b.business_signed_at,
      display_name: b.profiles?.display_name ?? null,
      full_name: b.profiles?.full_name ?? "Worker",
      career_path: b.profiles?.career_path ?? null,
      signed_jobs_count: b.trust_scores?.signed_jobs_count ?? 0,
    }));
  } else {
    const { data } = await supabase
      .from("bookings")
      .select("id, status, worker_signed_at, business_signed_at")
      .eq("opportunity_id", opp.id)
      .eq("worker_id", user.id)
      .maybeSingle();
    myBooking = data;
  }

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader email={user.email} role={role} />
      <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-12 md:px-12 md:py-16">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-2">
          Opportunity
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
          {opp.title}
        </h1>

        <div className="mt-6 flex flex-wrap gap-3 text-xs text-ink-2">
          {path && <span className="rounded-pill bg-surface-1 px-3 py-1">{path.label}</span>}
          {zone && <span className="rounded-pill bg-surface-1 px-3 py-1">{zone.label}</span>}
          <span className="rounded-pill bg-surface-1 px-3 py-1 font-mono">
            ₹{(opp.pay_amount_paise / 100).toLocaleString("en-IN")} · {opp.pay_type.replace("_", " ")}
          </span>
          {!opp.is_open && (
            <span className="rounded-pill bg-surface-2 px-3 py-1">Closed</span>
          )}
        </div>

        <div className="mt-10 prose prose-invert max-w-[70ch] whitespace-pre-wrap text-sm leading-relaxed text-ink-1">
          {opp.description}
        </div>

        <div className="mt-12 border-t border-ink-3/20 pt-10">
          {opp.business_id === user.id ? (
            <section>
              <h2 className="text-xs font-medium uppercase tracking-[0.15em] text-ink-2 mb-6">
                Applicants ({applicants.length})
              </h2>
              {applicants.length === 0 ? (
                <p className="text-sm text-ink-2">No applicants yet.</p>
              ) : (
                <ul className="space-y-3">
                  {applicants.map((a) => (
                    <li
                      key={a.id}
                      className="rounded-card border border-ink-3/20 bg-surface-1 p-5"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-base font-medium">
                            {a.display_name ?? a.full_name}
                          </p>
                          <p className="mt-1 text-xs text-ink-2">
                            {CAREER_PATHS.find((p) => p.slug === a.career_path)?.label ?? "—"}
                          </p>
                          <p className="mt-3 font-mono text-xs text-ink-2">
                            {a.signed_jobs_count} signed records ·{" "}
                            <span className="capitalize">{a.status.replace("_", " ")}</span>
                          </p>
                        </div>
                        <BookingActions
                          booking={{
                            id: a.id,
                            status: a.status,
                            worker_signed_at: a.worker_signed_at,
                            business_signed_at: a.business_signed_at,
                          }}
                          side="business"
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ) : myBooking ? (
            <section>
              <h2 className="text-xs font-medium uppercase tracking-[0.15em] text-ink-2 mb-6">
                Your application
              </h2>
              <div className="rounded-card border border-ink-3/20 bg-surface-1 p-6">
                <p className="font-mono text-sm capitalize text-ink-1">
                  Status: {myBooking.status.replace("_", " ")}
                </p>
                <div className="mt-6">
                  <BookingActions booking={myBooking} side="worker" />
                </div>
              </div>
            </section>
          ) : (
            <section>
              {opp.is_open ? (
                <ApplyButton opportunityId={opp.id} />
              ) : (
                <p className="text-sm text-ink-2">This opportunity is closed.</p>
              )}
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
