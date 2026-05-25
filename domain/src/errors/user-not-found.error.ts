import { DomainError } from "./domain.error";

export class UserNotFoundError extends DomainError {
  readonly type = "USER_NOT_FOUND";
}
