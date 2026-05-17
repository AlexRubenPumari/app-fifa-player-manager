import { ApplicationError } from "../../../errors";

export type Success<TValue> = {
  ok: true;
  value: TValue;
};

export type Failure<TError extends ApplicationError = ApplicationError> = {
  ok: false;
  error: TError;
};

export type Result<TValue, TError extends ApplicationError = ApplicationError> =
  | Success<TValue>
  | Failure<TError>;