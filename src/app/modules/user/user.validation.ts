import z from "zod";

export const createUserZodSchema = z.object({
  firstName: z
    .string({ error: "Name must be string" })
    .min(1, "First name is required")
    .trim(),

  lastName: z
    .string({ error: "Name must be string" })
    .min(1, "Last name is required")
    .trim(),

  email: z.email("Invalid email address").trim(),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional(),

  avatar: z.string().optional(),
});
