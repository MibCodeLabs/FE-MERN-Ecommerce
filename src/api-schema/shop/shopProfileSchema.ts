import { z } from "zod";

export const shopProfileSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),

  lastName: z.string().trim().min(1, "Last name is required"),

  contactNumber: z
    .string()
    .trim()
    .refine(
      (value) => value === "" || /^\+[1-9]\d{7,14}$/.test(value),
      "Enter a valid international phone number",
    )
});

export type ShopProfileForm = z.infer<typeof shopProfileSchema>;
