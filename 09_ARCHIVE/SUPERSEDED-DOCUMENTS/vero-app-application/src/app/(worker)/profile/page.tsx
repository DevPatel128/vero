import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AppHeader } from "@/components/layout/app-header";
import { ProfileForm } from "@/components/forms/profile-form";

export const metadata = {
  title: "Your profile",
};

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name, bio, career_path, skills, zone")
    .eq("user_id", user.id)
    .maybeSingle();

  const role = (user.user_metadata?.role as "worker" | "business" | undefined) ?? "worker";

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader email={user.email} role={role} />
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12 md:px-12 md:py-16">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-2">
          02 / Profile
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">Your profile</h1>
        <p className="mt-2 max-w-[60ch] text-sm text-ink-2">
          This is what businesses see when you apply. Be specific. Real skills, real
          zone — accuracy builds trust.
        </p>

        <div className="mt-12">
          <ProfileForm initial={profile} />
        </div>
      </main>
    </div>
  );
}
