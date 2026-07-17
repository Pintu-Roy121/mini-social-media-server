import { model, Schema } from "mongoose";
import { ICommentLike } from "./commentLike.interface";

const commentLikeSchema = new Schema<ICommentLike>(
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
    },
  },
  { timestamps: true, versionKey: false },
);

export const CommentLike = model<ICommentLike>(
  "CommentLike",
  commentLikeSchema,
);
