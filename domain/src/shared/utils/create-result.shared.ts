import { ApplicationError } from "../../errors";
import { Failure, Success } from "../types";

export const createResult = {
  ok: <TValue>(value: TValue): Success<TValue> => ({ ok: true, value }),
  error: <TError extends ApplicationError>(error: TError): Failure<TError> => ({ ok: false, error }),
};
