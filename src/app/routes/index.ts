import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { CommentRoutes } from "../modules/comment/comment.route";
import { CommentLikeRoutes } from "../modules/commentLike/commentLike.route";
import { PostRoutes } from "../modules/post/post.route";
import { PostLikeRoutes } from "../modules/postlike/postLike.route";
import { ReplyRoutes } from "../modules/reply/reply.route";
import { ReplyLikeRoutes } from "../modules/replyLike/replyLike.route";
import { UserRoutes } from "../modules/user/user.route";

export const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/post",
    route: PostRoutes,
  },
  {
    path: "/post-like",
    route: PostLikeRoutes,
  },
  {
    path: "/comment",
    route: CommentRoutes,
  },
  {
    path: "/comment-like",
    route: CommentLikeRoutes,
  },
  {
    path: "/reply",
    route: ReplyRoutes,
  },
  {
    path: "/reply-like",
    route: ReplyLikeRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
