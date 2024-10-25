import userModel from "../database/model/user.model";

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
};
