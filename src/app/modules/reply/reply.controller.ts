import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { ReplyServices } from "./reply.service";

const createReply = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await ReplyServices.createReply(
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

const getAllCommentsReplyByCommentId = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const commentReply = await ReplyServices.getAllCommentsReplyByCommentId(
      id as string,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Successful",
      data: commentReply,
    });
  },
);

export const ReplyController = { createReply, getAllCommentsReplyByCommentId };
