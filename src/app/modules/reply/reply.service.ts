import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";
import AppError from "../../errorHelpers/AppError";
import { Comment } from "../comment/comment.model";
import { Post } from "../post/post.model";
import { IReply } from "./reply.interface";
import { Reply } from "./reply.mode";

const createReply = async (payload: IReply, decodedToken: JwtPayload) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const comment = await Comment.findById(payload.comment).session(session);
    if (!comment) {
      throw new AppError(httpStatus.NOT_FOUND, "Comment not found!");
    }

    const [reply] = await Reply.create(
      [
        {
          user: decodedToken.userId,
          comment: payload.comment,
          text: payload.text,
        },
      ],
      { session },
    );

    // ← this is the "comment's replyCount updates" part
    await Comment.updateOne(
      { _id: payload.comment },
      { $inc: { replyCount: 1 } },
      { session },
    );

    await Post.updateOne(
      { _id: comment.post },
      { $inc: { commentCount: 1 } },
      { session },
    );

    await session.commitTransaction(); //transaction
    session.endSession();
    return reply;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const getAllCommentsReplyByCommentId = async (payload: string) => {
  const result = await Reply.find({ comment: payload })
    .sort({ createdAt: -1 })
    .populate("user", "firstName lastName createdAt email");
  return result;
};

export const ReplyServices = { createReply, getAllCommentsReplyByCommentId };
