import type { SafeUser } from "../users/index.js";

export interface AuthSession {
  accessToken: string;
  user: SafeUser;
}