import type { ErrorType } from "../shared/core/index.js";

export abstract class DomainError extends Error {
  abstract readonly type: ErrorType;

  constructor(message?: string) {
    super(message);

    this.name = this.constructor.name;
  }
}