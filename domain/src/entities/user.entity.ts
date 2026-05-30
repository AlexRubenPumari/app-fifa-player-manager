import type { Email, Entity } from "../shared/index.js";

export interface User extends Entity {
  username: string;
  email: Email;
  passwordHash: string;
}