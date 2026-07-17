import { Types } from "mongoose";

export interface IReply {
  user: Types.ObjectId;
  comment: Types.ObjectId;
  text: string;
  likeCount?: number;
  createdAt?: Date;
}
