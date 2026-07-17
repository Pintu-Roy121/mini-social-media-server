import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { ReplyController } from "./reply.controller";

const router = Router();

router.post("/create", checkAuth(), ReplyController.createReply);

router.get("/:id", checkAuth(), ReplyController.getAllCommentsReplyByCommentId);

export const ReplyRoutes = router;
