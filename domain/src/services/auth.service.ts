import { SafeUser, AuthSession, AuthCredentials  } from "../shared/index";

export interface AuthService {
  login(credentials: AuthCredentials): Promise<AuthSession>;
  verifyAccessToken(token: string): Promise<boolean>;
  logout(): void;
  getCurrentUser(): SafeUser | null;
}

