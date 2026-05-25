import { SafeUser } from "../users";

export interface AuthSession {
  accessToken: string;
  user: SafeUser;
}