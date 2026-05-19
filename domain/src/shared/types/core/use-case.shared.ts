import { Result, Request, RequestShape } from "./index";
import { DomainError, InvalidRequestError } from "../../../errors";

export type UseCaseError<
  TError extends DomainError = DomainError
> = TError | InvalidRequestError;

export interface UseCase<
  TDependencies,
  TResponse,
  TError extends DomainError,
  TShape extends RequestShape = RequestShape,
> {
  isAuthRequired: boolean;
  execute(
    dependencies: TDependencies,
    request: Request<TShape>
  ): Promise<Result<TResponse, UseCaseError<TError>>>;
};