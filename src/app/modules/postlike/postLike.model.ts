import { model, Schema } from "mongoose";
import { IPostLike } from "./postLike.interface";

const postLikeSchema = new Schema<IPostLike>(
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
    },
  },
  { timestamps: true, versionKey: false },
);

export const PostLike = model<IPostLike>("PostLike", postLikeSchema);
