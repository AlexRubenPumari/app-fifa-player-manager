import { DomainError } from "./domain.error";

export class NotFoundError extends DomainError {
  readonly type = "NOT_FOUND";
}