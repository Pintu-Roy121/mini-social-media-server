import { Types } from "mongoose";

export interface IReplyLike {
  user: Types.ObjectId;
  reply: Types.ObjectId;
  createdAt?: Date;
}
