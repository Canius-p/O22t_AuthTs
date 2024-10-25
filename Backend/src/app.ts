import express from "express";
import cors from "cors";
import { connectDB } from "./database/database.connection";
import { envConfig } from "./config/env.config";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/error.handler";
import catchErrors from "./utils/catch.error";
import { httpStatus } from "./config/http.status";
import authRoute from "./routes/auth.route";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: envConfig.appOrigin,
    credentials: true,
  })
);
app.use(cookieParser());
app.get("/", (req, res, next) => {
  return res.status(httpStatus.OK).json({
    status: "success",
    message: "Hello from express",
  });
});

//router
app.use("/api/auth", authRoute);
connectDB();
app.use(errorHandler);

export default app;
