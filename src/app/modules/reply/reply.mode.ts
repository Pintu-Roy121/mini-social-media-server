import { model, Schema } from "mongoose";
import { IReply } from "./reply.interface";

const createReplySchema = new Schema<IReply>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comment: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      required: true,
      index: true,
    },
    text: {
      type: String,
      required: true,
    },
    likeCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, versionKey: false },
);

export const Reply = model<IReply>("Reply", createReplySchema);
