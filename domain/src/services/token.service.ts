import { AccessTokenPayload } from "../shared";

export interface TokenService {
  signAccessToken(
    payload: AccessTokenPayload
  ): Promise<string>;

  signRefreshToken(
    userId: string
  ): Promise<string>;

  verifyAccessToken(
    token: string
  ): Promise<AccessTokenPayload | null>;
}