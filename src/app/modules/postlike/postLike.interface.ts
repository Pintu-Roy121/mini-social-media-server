import { Types } from "mongoose";

export interface IPostLike {
  user: Types.ObjectId;
  post: Types.ObjectId;
}
