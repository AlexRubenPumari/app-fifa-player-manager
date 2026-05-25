import { DomainError } from "./domain.error";

export class InvalidCredentialsError extends DomainError {
  readonly type = "INVALID_CREDENTIALS";
}
