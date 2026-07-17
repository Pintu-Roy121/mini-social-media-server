import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

const credentialLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await AuthServices.credentialLogin(req.body);
    const { accessToken, ...rest } = user;
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Login Successful",
      data: { accessToken, data: rest },
    });
  },
);

export const AuthController = {
  credentialLogin,
};
