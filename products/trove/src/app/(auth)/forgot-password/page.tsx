import type { Metadata } from "next";
import Link from "next/link";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export const metadata: Metadata = {
  title: "Reset your password",
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return (
    <div>
      <h1 className="display-serif text-3xl tracking-tight">Reset your password.</h1>
      <p className="mt-2 text-sm text-muted-foreground">We'll email you a link.</p>
      <div className="mt-8"><ForgotPasswordForm /></div>
      <p className="mt-6 text-sm text-muted-foreground">
        Remembered it? <Link href="/login" className="link-ft">Sign in</Link>
      </p>
    </div>
  );
}
