import { Email, Entity } from "../shared";

export interface User extends Entity {
  username: string;
  email: Email;
  passwordHash: string;
}