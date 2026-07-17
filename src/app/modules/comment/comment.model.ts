import { model, Schema } from "mongoose";
import { IComment } from "./comment.interface";

const commentCreateSchema = new Schema<IComment>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
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
    replyCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, versionKey: false },
);

export const Comment = model<IComment>("Comment", commentCreateSchema);
