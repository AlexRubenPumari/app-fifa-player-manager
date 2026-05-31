import type { Result } from "./index.js";
import { DomainError, InvalidRequestError } from "../../../errors/index.js";

export type UseCaseError<
  TError extends DomainError = DomainError
> = TError | InvalidRequestError;

export interface UseCase<
  TDependencies,
  TRequest,
  TResponse,
  TError extends DomainError,
> {
  isAuthRequired: boolean;
  execute(
    dependencies: TDependencies,
    request: TRequest
  ): Promise<Result<TResponse, UseCaseError<TError>>>;
};