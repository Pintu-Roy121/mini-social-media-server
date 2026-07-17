import bcrypt from "bcryptjs";
import httpStatus from "http-status-codes";
import { envVars } from "../../config/env";
import AppError from "../../errorHelpers/AppError";
import { generateToken } from "../../utils/jwt";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";

const credentialLogin = async (payload: Partial<IUser>) => {
  const { email, password: newPassword } = payload;
  const isUserExist = await User.findOne({ email });
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User doesn't exist");
  }

  const isPasswordMatch = await bcrypt.compare(
    newPassword as string,
    isUserExist.password,
  );

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.BAD_REQUEST, "Wrong Password!");
  }
  const jwtPayload = {
    userId: isUserExist._id,
    email: isUserExist.email,
  };
  const accessToken = generateToken(
    jwtPayload,
    envVars.JWT_ACCESS_SECRET,
    envVars.JWT_ACCESS_EXPIRES,
  );

  const { password, ...rest } = isUserExist.toObject();

  return {
    accessToken,
    ...rest,
  };
};

export const AuthServices = { credentialLogin };
