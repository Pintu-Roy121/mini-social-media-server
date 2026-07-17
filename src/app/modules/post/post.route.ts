import { Router } from "express";
import { multerUpload } from "../../config/multer.config";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";
import { PostController } from "./post.controller";
import { postCreateZodSchema } from "./post.validation";

const router = Router();

router.post(
  "/create",
  checkAuth(),
  multerUpload.single("file"),
  validateRequest(postCreateZodSchema),
  PostController.createPost,
);

router.get("/", checkAuth(), PostController.getAllPost);

router.get("/my-posts", checkAuth(), PostController.getMyPosts);

export const PostRoutes = router;
