import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";
import { CommentController } from "./comment.controller";
import { commentCreateZodSchema } from "./comment.validation";

const router = Router();

router.post(
  "/create",
  checkAuth(),
  validateRequest(commentCreateZodSchema),
  CommentController.createComment,
);

router.get("/:id", checkAuth(), CommentController.getAllCommentByPostId);

export const CommentRoutes = router;
