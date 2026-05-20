import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getProfile } from "@/lib/auth";
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow";

export const metadata: Metadata = { title: "Welcome to Trove", robots: { index: false, follow: false } };

export default async function OnboardingPage() {
  const profile = await getProfile();
  if (!profile) redirect("/login");
  if (profile.onboarding_complete) redirect("/dashboard");
  return <OnboardingFlow initialName={profile.full_name ?? ""} currency={profile.currency} />;
}
