import z from "zod";

export const postLikeZodSchema = z.object({
  post: z.string(),
});
