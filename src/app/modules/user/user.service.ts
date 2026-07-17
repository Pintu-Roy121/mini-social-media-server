import bcrypt from "bcryptjs";
import httpStatus from "http-status-codes";
import { envVars } from "../../config/env";
import AppError from "../../errorHelpers/AppError";
import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUser = async (payload: Partial<IUser>) => {
  const { email, password: newPassword, ...rest } = payload;

  const isUserExit = await User.findOne({ email });
  if (isUserExit) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already Exist");
  }

  const hashPassword = await bcrypt.hash(
    newPassword as string,
    Number(envVars.BCRYPT_SALT_ROUND),
  );

  const createPayload = {
    email,
    password: hashPassword,
    ...rest,
  };

  const result = await User.create(createPayload);
  const { password, ...user } = result.toObject();

  return user;
};

const getAllUsers = async () => {
  const users = await User.find({}).select("-password");
  const totalUsers = await User.countDocuments();

  return {
    data: users,
    meta: {
      total: totalUsers,
    },
  };
};

export const UserServices = { createUser, getAllUsers };
