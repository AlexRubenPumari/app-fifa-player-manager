import { Entity } from "../shared";

export interface User extends Entity {
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
}
