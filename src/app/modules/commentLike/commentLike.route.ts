import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";
import { CommentLikeController } from "./commentLike.controller";
import { commentLikeCreateZodSchema } from "./commentLike.validation";

const router = Router();

router.post(
  "/create",
  checkAuth(),
  validateRequest(commentLikeCreateZodSchema),
  CommentLikeController.createCommentLike,
);
router.get(
  "/:id",
  checkAuth(),
  CommentLikeController.getAllCommentsLikeByCommentId,
);

export const CommentLikeRoutes = router;
