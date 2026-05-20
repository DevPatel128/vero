import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your Trove account.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div>
      <h1 className="display-serif text-3xl tracking-tight">Welcome back.</h1>
      <p className="mt-2 text-sm text-muted-foreground">Sign in to continue.</p>
      <div className="mt-8">
        <LoginForm />
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        New here? <Link href="/register" className="link-ft">Create an account</Link>
      </p>
    </div>
  );
}
