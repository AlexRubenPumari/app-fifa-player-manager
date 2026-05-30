import type { User } from "../../entities/index.js";

export interface SafeUser extends Omit<User, "passwordHash"> {}
