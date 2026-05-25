import { Result } from "../core";
import { DomainError, InvalidRequestError } from "../../errors";

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