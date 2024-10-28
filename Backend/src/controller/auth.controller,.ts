import { z } from "zod";
import catchErrors from "../utils/catch.error";

const registerSchema = z
  .object({
    email: z.string().email().min(1).max(255),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
    userAgent: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const registerController = catchErrors(async (req, res, next) => {
  const request = registerSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const { user, accessToken, refreshToken } = await registerUser(request);
  return setAuthCookies({ res, accessToken, refreshToken });
});
function registerUser(request: {
  email: string;
  password: string;
  confirmPassword: string;
  userAgent?: string | undefined;
}):
  | { user: any; accessToken: any; refreshToken: any }
  | PromiseLike<{ user: any; accessToken: any; refreshToken: any }> {
  throw new Error("Function not implemented.");
}
