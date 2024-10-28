import verificationCodeTypes from "../@types/verification";
import { envConfig } from "../config/env.config";
import SessionModel from "../database/model/sessions.model";
import userModel from "../database/model/user.model";
import verificationModel from "../database/model/verification.model";
import { oneYearFromNow } from "../utils/date";
import Jwt from "jsonwebtoken";
export type createAccountParamms = {
  email: string;
  password: string;
  userAgent: string;
};

export const createAccount = async (data: createAccountParamms) => {
  const existsUser = await userModel.exists({ email: data.email });
  if (existsUser) {
    throw new Error("User already exists");
  }
  const user = await userModel.create({
    email: data.email,
    password: data.password,
  });

  const verificationCode = await verificationModel.create({
    userId: user._id,
    type: verificationCodeTypes.emailVerification,
    expiredAt: oneYearFromNow(),
  });

  const session = await SessionModel.create({
    userId: user._id,
    userAgent: data.userAgent,
  });

  const refreshToken = Jwt.sign(
    { sessionId: session._id },
    envConfig.jwtRefreshSecret,
    {
      auidence: ["user"],
      expiresIn: "7d",
    }
  );
  const accessToken = Jwt.sign(
    {
      userId: user._id,
      sessionId: session._id,
    },
    envConfig.jwtSecret,
    {
      auidence: ["user"],
      expiresIn: "15m",
    }
  );
  return {
    user,
    accessToken,
    refreshToken,
  };
};
