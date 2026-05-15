import { User } from "../../entities/user.entity";

export interface SafeUser extends Omit<User, "passwordHash"> {}
