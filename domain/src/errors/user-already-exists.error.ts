import { DomainError } from "./domain.error.js";

export class UserAlreadyExistsError extends DomainError {
  readonly type = "USER_ALREADY_EXISTS";
}