import { DomainError } from "../../../errors";

export type Success<TValue> = {
  ok: true;
  value: TValue;
};

export type Failure<TError extends DomainError> = {
  ok: false;
  error: TError;
};

export type Result<TValue, TError extends DomainError> =
  | Success<TValue>
  | Failure<TError>;