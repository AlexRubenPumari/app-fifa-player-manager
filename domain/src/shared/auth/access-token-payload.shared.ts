import { Email } from "..";

export interface AccessTokenPayload {
  userId: number;
  email: Email;
}