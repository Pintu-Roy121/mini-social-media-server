import z from "zod";

export const commentCreateZodSchema = z.object({
  text: z.string().min(1, "Text is required"),
  post: z.string(),
});
