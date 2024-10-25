import { ErrorRequestHandler, Response } from "express";
import { httpStatus } from "../config/http.status";
import { z } from "zod";

const handleZodError = (res: Response, error: z.ZodError) => {
  const errors = error.issues.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message,
  }));
  return res.status(httpStatus.BAD_REQUEST).json({
    message: error.message,
    errors,
  });
};
const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log(`PATH: ${req.path}`, error);
  if (error instanceof z.ZodError) {
    return handleZodError(res, error);
  }

  return res
    .status(httpStatus.INTERNAL_SERVER_ERROR)
    .send("Something went wrong");
};

export default errorHandler;
