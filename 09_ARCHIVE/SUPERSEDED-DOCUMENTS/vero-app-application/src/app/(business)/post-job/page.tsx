import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AppHeader } from "@/components/layout/app-header";
import { PostJobForm } from "@/components/forms/post-job-form";

export const metadata = {
  title: "Post a job",
};

export default async function PostJobPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const role = (user.user_metadata?.role as "worker" | "business" | undefined) ?? "worker";
  if (role !== "business") redirect("/dashboard");

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader email={user.email} role={role} />
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12 md:px-12 md:py-16">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-2">
          04 / Post a job
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">Post a job</h1>
        <p className="mt-2 max-w-[60ch] text-sm text-ink-2">
          Be specific. The clearer the scope, the better the applicants — and the
          fewer disputes.
        </p>

        <div className="mt-12">
          <PostJobForm />
        </div>
      </main>
    </div>
  );
}
