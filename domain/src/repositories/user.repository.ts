import { User } from "../entities/index";
import { Repository } from "../shared/repository.shared";

export interface UserRepository extends Repository<User> {};
