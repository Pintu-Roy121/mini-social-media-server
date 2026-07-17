import { Types } from "mongoose";

export interface IComment {
  user: Types.ObjectId;
  post: Types.ObjectId;
  text: string;
  likeCount?: number;
  replyCount?: number;
  createdAt?: Date;
}
