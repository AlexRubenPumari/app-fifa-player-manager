import { DomainError } from "./domain.error.js";

export class UserNotFoundError extends DomainError {
  readonly type = "USER_NOT_FOUND";
}
