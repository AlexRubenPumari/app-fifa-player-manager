import { EnvKey, getEnv } from "./index"

export const env: Record<EnvKey, string> = {
  DATABASE_URL: getEnv("DATABASE_URL"),
};