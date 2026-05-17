import { DomainError } from "./domain.error";

export class InvalidRequestError extends DomainError {
  readonly type = "INVALID_REQUEST";
}
