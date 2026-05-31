import type { User } from "../entities/index.js";
import type { Repository } from "../shared/core/index.js";

export interface UserRepository extends Repository<User> {};
