import { DomainError } from "./domain.error.js";

export class InvalidCredentialsError extends DomainError {
  readonly type = "INVALID_CREDENTIALS";
}
