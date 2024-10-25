import monsgoose from "mongoose";
import { envConfig } from "../config/env.config";

export const connectDB = async () => {
  try {
    await monsgoose.connect(envConfig.mongoUri);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("database connection error", error);
    process.exit(1);
  }
};
