import { CookieOptions, Response } from "express";
import { fifteenMinutesFromNow } from "./date";

const secure = process.env.NODE_ENV === "production";

const defaultOptions: CookieOptions = {
  httpOnly: true,
  sameSite: "strict",
  secure,
};

export const getAccesstokenCookie = (): CookieOptions => ({
  ...defaultOptions,
  expires: fifteenMinutesFromNow(),
  path: "/auth/refresh",
});

type CookieParams = {
  res: Response;
  name: string;
  value: string;
  options?: CookieOptions;
};

export const setAuthCookies = ({
  res,
  accessToken,
  refreshToken,
}: CookieParams) => {
  res.cookie("accessToken", accessToken).cookie("refreshToken", refreshToken);
};
