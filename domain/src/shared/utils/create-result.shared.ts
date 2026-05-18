import { DomainError } from "../../errors";
import { Failure, Success } from "../types";

export const createResult = {
  ok: <TValue>(value: TValue): Success<TValue> => ({ ok: true, value }),
  error: <TError extends DomainError>(error: TError): Failure<TError> => ({ ok: false, error }),
};
