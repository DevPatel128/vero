import { z } from "zod";
import { CITY_ZONES } from "./profile";

export const opportunitySchema = z.object({
  title: z.string().min(4, "Title too short").max(120),
  description: z.string().min(20, "Add more detail").max(2000),
  careerPath: z.string().min(1, "Pick a category"),
  city: z.literal("bengaluru"),
  zone: z.enum(CITY_ZONES),
  payType: z.enum(["fixed", "day_rate", "hourly"]),
  payAmount: z
    .number()
    .int("Whole rupees only")
    .min(100, "Minimum ₹100")
    .max(1_000_000, "Maximum ₹10,00,000"),
  deadline: z.string().datetime().optional().nullable(),
});

export type OpportunityInput = z.infer<typeof opportunitySchema>;
