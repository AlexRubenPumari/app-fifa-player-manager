import { DomainError } from "./domain.error.js";

export class InvalidRequestError extends DomainError {
  readonly type = "INVALID_REQUEST";
}
