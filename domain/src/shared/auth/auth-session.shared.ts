import { SafeUser } from "../../safe-user.shared";

export interface AuthSession {
  accessToken: string;
  user: SafeUser;
}