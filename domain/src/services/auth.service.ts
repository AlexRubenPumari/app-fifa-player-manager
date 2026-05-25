import { AuthSession, AuthCredentials  } from "../shared/auth";
import { SafeUser  } from "../shared/users";

export interface AuthService {
  login(credentials: AuthCredentials): Promise<AuthSession | null>;
  verifyAccessToken(token: string): Promise<boolean>;
  logout(): void;
  getCurrentUser(): SafeUser | null;
  hashPassword(password: string): Promise<string>;
}