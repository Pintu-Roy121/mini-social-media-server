import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { PostLikeServices } from "./postLike.service";

const createPostLike = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const postLike = await PostLikeServices.createPostLike(
      req.body,
      req.user as JwtPayload,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Successful",
      data: postLike,
    });
  },
);
const getAllLikeByPostId = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const postLike = await PostLikeServices.getAllLikeByPostId(id as string);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Successful",
      data: postLike,
    });
  },
);

export const PostLikeController = { createPostLike, getAllLikeByPostId };
