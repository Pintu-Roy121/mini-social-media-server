import { Types } from "mongoose";

export interface ICommentLike {
  user: Types.ObjectId;
  comment: Types.ObjectId;
  createdAt?: Date;
}
