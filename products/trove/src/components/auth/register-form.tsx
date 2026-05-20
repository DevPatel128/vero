"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/toast";
import { createClient } from "@/lib/supabase/client";
import { GoogleIcon } from "@/components/auth/social-icons";

const schema = z.object({
  full_name: z.string().min(2, "Tell us your name"),
  email: z.string().email("Valid email please"),
  password: z.string().min(8, "At least 8 characters").regex(/[0-9]/, "Include a number"),
});
type FormValues = z.infer<typeof schema>;

export function RegisterForm() {
  const router = useRouter();
  const [oauthLoading, setOauthLoading] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: { data: { full_name: data.full_name }, emailRedirectTo: `${window.location.origin}/auth/callback?next=/onboarding` },
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Check your email to verify and finish setup.");
    router.push("/login");
  };

  const signUpWithGoogle = async () => {
    setOauthLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback?next=/onboarding` },
    });
    if (error) {
      toast.error(error.message);
      setOauthLoading(false);
    }
  };

  return (
    <>
      <Button type="button" variant="outline" className="w-full" onClick={signUpWithGoogle} loading={oauthLoading} disabled={oauthLoading}>
        <GoogleIcon className="h-4 w-4" /> Continue with Google
      </Button>
      <div className="my-6 flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs uppercase tracking-wider text-muted-foreground">Or with email</span>
        <Separator className="flex-1" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div className="space-y-2">
          <Label htmlFor="full_name">Full name</Label>
          <Input id="full_name" autoComplete="name" placeholder="Maya Reed" {...register("full_name")} />
          {errors.full_name && <p className="text-xs text-trove-danger">{errors.full_name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" autoComplete="email" placeholder="you@email.com" {...register("email")} />
          {errors.email && <p className="text-xs text-trove-danger">{errors.email.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" autoComplete="new-password" placeholder="8+ characters, at least 1 number" {...register("password")} />
          {errors.password && <p className="text-xs text-trove-danger">{errors.password.message}</p>}
        </div>
        <Button type="submit" className="w-full" loading={isSubmitting} disabled={isSubmitting}>Create account</Button>
      </form>
    </>
  );
}
