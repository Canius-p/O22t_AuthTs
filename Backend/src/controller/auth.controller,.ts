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
});
