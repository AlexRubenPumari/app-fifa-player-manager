import { EnvKey, getEnv } from "./index"

export const env: Record<EnvKey, string> = {
  ACCESS_TOKEN_SECRET: getEnv("ACCESS_TOKEN_SECRET"),
  DATABASE_URL: getEnv("DATABASE_URL"),
};