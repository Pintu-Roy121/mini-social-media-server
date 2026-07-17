import { JwtPayload } from "jsonwebtoken";
import { Post } from "../post/post.model";
import { IPostLike } from "./postLike.interface";
import { PostLike } from "./postLike.model";

const createPostLike = async (
  payload: Partial<IPostLike>,
  decodedToken: JwtPayload,
) => {
  const filter = { user: decodedToken.userId, post: payload.post };
  const isExist = await PostLike.findOne(filter);

  if (isExist) {
    await isExist.deleteOne();
    const post = await Post.findByIdAndUpdate(
      payload.post,
      { $inc: { likeCount: -1 } },
      { new: true },
    );
    return {
      liked: false,
      postLike: { _id: isExist._id, delete: true },
      likeCount: Math.max(post?.likeCount ?? 0, 0),
    };
  }

  const postLike = await PostLike.create(filter);
  const post = await Post.findByIdAndUpdate(
    payload.post,
    { $inc: { likeCount: 1 } },
    { new: true },
  );
  return { liked: true, postLike, likeCount: post?.likeCount ?? 0 };
};

const getAllLikeByPostId = async (payload: string) => {
  const result = await PostLike.find({ post: payload })
    .sort({ createdAt: -1 })
    .populate("user", "email");
  return result;
};

export const PostLikeServices = { createPostLike, getAllLikeByPostId };
