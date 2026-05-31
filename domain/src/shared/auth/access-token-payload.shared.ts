import type { Email } from "../index.js";

export interface AccessTokenPayload {
  userId: number;
  email: Email;
}