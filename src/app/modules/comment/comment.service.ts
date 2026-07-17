import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";
import AppError from "../../errorHelpers/AppError";
import { Post } from "../post/post.model";
import { IComment } from "./comment.interface";
import { Comment } from "./comment.model";

const createComment = async (
  payload: Partial<IComment>,
  decodedToken: JwtPayload,
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const post = await Post.findById(payload.post).session(session);
    if (!post) throw new AppError(404, "Post not found");

    const [comment] = await Comment.create(
      [{ user: decodedToken.userId, post: payload.post, text: payload.text }],
      { session },
    );

    await Post.updateOne(
      { _id: payload.post },
      { $inc: { commentCount: 1 } },
      { session },
    );

    await session.commitTransaction();
    return comment;
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
};

const getAllCommentByPostId = async (payload: string) => {
  const result = await Comment.find({ post: payload })
    .sort({ createdAt: -1 })
    .populate("user", "firstName lastName createdAt email");
  return result;
};
export const CommentServices = { createComment, getAllCommentByPostId };
