import { ErrorType } from "../shared/core";

export abstract class DomainError extends Error {
  abstract readonly type: ErrorType;

  constructor(message?: string) {
    super(message);

    this.name = this.constructor.name;
  }
}