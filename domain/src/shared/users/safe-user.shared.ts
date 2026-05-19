import { User } from "../../entities";

export interface SafeUser extends Omit<User, "passwordHash"> {}
