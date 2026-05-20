import { redirect } from "next/navigation";
import { getProfile } from "@/lib/auth";
import { AppShell } from "@/components/app/app-shell";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const profile = await getProfile();
  if (!profile) redirect("/login");
  if (!profile.onboarding_complete) redirect("/onboarding");

  return (
    <AppShell
      user={{
        id: profile.id,
        name: profile.full_name ?? profile.email,
        email: profile.email,
        avatar: profile.avatar_url,
        role: profile.role,
      }}
    >
      {children}
    </AppShell>
  );
}
