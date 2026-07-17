import { Types } from "mongoose";

export enum PostVisibility {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
}

export interface IPost {
  text: string;
  image?: string;
  author: Types.ObjectId;
  visibility: PostVisibility;
  likeCount: number;
  commentCount: number;
  createdAt?: Date;
}
