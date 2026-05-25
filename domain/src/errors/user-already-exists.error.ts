import { DomainError } from "./domain.error";

export class UserAlreadyExistsError extends DomainError {
  readonly type = "USER_ALREADY_EXISTS";
}