import { DomainError } from "../../../errors";
import { Failure, Success } from "../index";

interface CreateResult {
  ok(): Success<void>;
  ok<TValue>(value: TValue): Success<TValue>;

  error<TError extends DomainError>(
    error: TError
  ): Failure<TError>;
}

export const createResult: CreateResult = {
  ok: <TValue>(value?: TValue) => ({ ok: true as const, value }),
  error: <TError extends DomainError>(error: TError): Failure<TError> => ({ ok: false as const, error }),
};
