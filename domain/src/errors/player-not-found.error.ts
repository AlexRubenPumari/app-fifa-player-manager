import { DomainError } from "./domain.error.js";

export class PlayerNotFoundError extends DomainError {
  readonly type = "PLAYER_NOT_FOUND";
}