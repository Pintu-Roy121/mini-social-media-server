import { model, Schema } from "mongoose";
import { IReplyLike } from "./replyLike.interface";

const ReplyLikeSchema = new Schema<IReplyLike>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    reply: {
      type: Schema.Types.ObjectId,
      ref: "Reply",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ReplyLike = model<IReplyLike>("ReplyLike", ReplyLikeSchema);
