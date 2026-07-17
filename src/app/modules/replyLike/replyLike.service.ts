import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errorHelpers/AppError";
import { Reply } from "../reply/reply.mode";
import { IReplyLike } from "./replyLike.interface";
import { ReplyLike } from "./replyLike.model";

const createReplyLike = async (
  payload: IReplyLike,
  decodedToken: JwtPayload,
) => {
  const reply = await Reply.findById(payload.reply);
  if (!reply) throw new AppError(httpStatus.NOT_FOUND, "Reply not found");

  const filter = { user: decodedToken.userId, reply: payload.reply };
  const existing = await ReplyLike.findOne(filter);

  if (existing) {
    await existing.deleteOne();
    const updated = await Reply.findByIdAndUpdate(
      payload.reply,
      { $inc: { likeCount: -1 } },
      { new: true },
    );
    return { liked: false, likeCount: Math.max(updated?.likeCount ?? 0, 0) };
  }

  await ReplyLike.create(filter);
  const updated = await Reply.findByIdAndUpdate(
    payload.reply,
    { $inc: { likeCount: 1 } },
    { new: true },
  );
  return { liked: true, likeCount: updated?.likeCount ?? 0 };
};

const getAllReplyLikeByReplyId = async (payload: string) => {
  const result = await ReplyLike.find({ reply: payload })
    .sort({ createdAt: -1 })
    .populate("user", "email");
  return result;
};

export const ReplyLikeServices = {
  createReplyLike,
  getAllReplyLikeByReplyId,
};
