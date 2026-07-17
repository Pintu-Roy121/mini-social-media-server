import z from "zod";

export const commentLikeCreateZodSchema = z.object({
  comment: z.string().trim().min(1, "comment is required"),
});
