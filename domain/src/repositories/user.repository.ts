import { User } from "../entities/index";
import { Repository } from "../shared/core";

export interface UserRepository extends Repository<User> {};
