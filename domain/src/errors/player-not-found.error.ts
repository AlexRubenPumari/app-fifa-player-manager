import { DomainError } from "./domain.error";

export class PlayerNotFoundError extends DomainError {
  readonly type = "PLAYER_NOT_FOUND";
}