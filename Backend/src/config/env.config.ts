import { config } from "dotenv";
config();

const getEnv = (key: string, defaultValue: string) => {
  const value = process.env[key] || defaultValue;
  if (value === undefined) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value;
};
export const envConfig = {
  port: getEnv("PORT", "3000"),
  appOrigin: getEnv("APP_ORIGIN", "http://localhost:3000"),

  mongoUri: getEnv("MONGO_URI", "mongodb://localhost:27017"),
  jwtSecret: getEnv("JWT_SECRET", "some-secret-key"),
  jwtRefreshSecret: getEnv("JWT_REFRESH_SECRET", "some-refresh-secret-key"),
};
