import { z } from "zod";

const passwordPolicy = z
  .string()
  .min(12, "Password must be at least 12 characters")
  .regex(/[A-Z]/, "Must contain an uppercase letter")
  .regex(/[a-z]/, "Must contain a lowercase letter")
  .regex(/[0-9]/, "Must contain a number")
  .regex(/[^A-Za-z0-9]/, "Must contain a special character");

export const signupSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: passwordPolicy,
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(255, "Name too long"),
  role: z.enum(["worker", "business"]),
  consent: z
    .boolean()
    .refine((v) => v === true, "You must agree to the terms to continue"),
});

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export const otpSchema = z.object({
  code: z
    .string()
    .length(6, "Code must be 6 digits")
    .regex(/^\d{6}$/, "Code must be numeric"),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type OtpInput = z.infer<typeof otpSchema>;
