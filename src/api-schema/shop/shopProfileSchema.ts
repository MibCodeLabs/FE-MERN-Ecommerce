import { z } from "zod";

export const shopProfileSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required"),

  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required"),

  contactNumber: z
    .string()
    .trim()
    .min(1, "Contact number is required"),
});

export type ShopProfileForm = z.infer<typeof shopProfileSchema>;