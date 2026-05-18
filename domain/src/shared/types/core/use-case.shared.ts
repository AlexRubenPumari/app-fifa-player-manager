import { Result, Schema, SchemaInput } from "./index";
import { DomainError, InvalidRequestError } from "../../../errors/index";

export type UseCaseError<TError extends DomainError = DomainError> = TError | InvalidRequestError;

export interface UseCase<
  TDependencies,
  TRequestSchema extends Schema,
  TResponse,
  TError extends DomainError = DomainError
> {
  isAuthRequired: boolean;
  execute: (
    dependencies: TDependencies,
    request: SchemaInput<TRequestSchema>
  ) => Promise<Result<TResponse, UseCaseError<TError>>>;
};