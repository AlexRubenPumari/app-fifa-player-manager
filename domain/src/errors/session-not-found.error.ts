import { DomainError } from "./domain.error";

export class SessionNotFoundError extends DomainError {
  readonly type = "SESSION_NOT_FOUND";
}
