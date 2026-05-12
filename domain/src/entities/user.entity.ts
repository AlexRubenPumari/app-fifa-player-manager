import { Entity } from "../shared/core/entity.shared";

export interface User extends Entity {
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
}
