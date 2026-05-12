import { User } from "../entities/user.entity";

export interface AuthenticatedUser extends Omit<User, "passwordHash"> {}
