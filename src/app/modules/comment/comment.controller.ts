import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { CommentServices } from "./comment.service";

const createComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await CommentServices.createComment(
      req.body,
      req.user as JwtPayload,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Successful",
      data: result,
    });
  },
);

const getAllCommentByPostId = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const postLike = await CommentServices.getAllCommentByPostId(id as string);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Successful",
      data: postLike,
    });
  },
);

export const CommentController = { createComment, getAllCommentByPostId };
