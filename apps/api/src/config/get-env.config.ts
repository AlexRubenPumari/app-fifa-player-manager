import { EnvKey } from "./env-key.config";

export function getEnv(name: EnvKey): string {
  const value = process.env[name];

  if (!value) throw new Error(`Environment variable ${name} is not defined`);

  return value;
}