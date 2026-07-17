import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";
import AppError from "../../errorHelpers/AppError";
import { Comment } from "../comment/comment.model";
import { ICommentLike } from "./commentLike.interface";
import { CommentLike } from "./commentLike.model";

const createCommentLike = async (
  payload: Partial<ICommentLike>,
  decodedToken: JwtPayload,
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const comment = await Comment.findById(payload.comment).session(session);
    if (!comment) throw new AppError(404, "Comment not found");

    const filter = { user: decodedToken.userId, comment: payload.comment };
    const existing = await CommentLike.findOne(filter).session(session);

    let result: { liked: boolean; commentLike?: object; likeCount: number };

    if (existing) {
      await existing.deleteOne({ session });

      const updated = await Comment.findByIdAndUpdate(
        payload.comment,
        { $inc: { likeCount: -1 } },
        { new: true, session },
      );

      result = {
        liked: false,
        commentLike: { _id: existing?._id, delete: true },
        likeCount: Math.max(updated?.likeCount ?? 0, 0),
      };
    } else {
      const commentLike = await CommentLike.create([filter], { session });

      const updated = await Comment.findByIdAndUpdate(
        payload.comment,
        { $inc: { likeCount: 1 } },
        { new: true, session },
      );

      result = {
        liked: true,
        commentLike: commentLike[0],
        likeCount: updated?.likeCount ?? 0,
      };
    }

    await session.commitTransaction();
    session.endSession();
    return result;
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
};

const getAllCommentsLikeByCommentId = async (payload: string) => {
  const result = await CommentLike.find({ comment: payload })
    .sort({ createdAt: -1 })
    .populate("user", "email");
  return result;
};

export const CommentLikeServices = {
  createCommentLike,
  getAllCommentsLikeByCommentId,
};
