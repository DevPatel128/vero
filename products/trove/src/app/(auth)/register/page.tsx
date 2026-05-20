import type { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Create your account",
  description: "Start tracking your money smarter — free forever for individuals.",
  robots: { index: false, follow: false },
};

export default function RegisterPage() {
  return (
    <div>
      <h1 className="display-serif text-3xl tracking-tight">Create your account.</h1>
      <p className="mt-2 text-sm text-muted-foreground">Free forever. No card required.</p>
      <div className="mt-8"><RegisterForm /></div>
      <p className="mt-6 text-sm text-muted-foreground">
        Already a member? <Link href="/login" className="link-ft">Sign in</Link>
      </p>
      <p className="mt-6 text-xs text-muted-foreground">
        By signing up you agree to our <Link href="/terms" className="link-ft">Terms</Link> and <Link href="/privacy" className="link-ft">Privacy Policy</Link>.
      </p>
    </div>
  );
}
