import { Result, UseCase, UseCaseError } from "../../index";
import { DomainError } from "../../../errors";
import { validateRequest } from "../utils";
import { Schema } from "../types";

interface UseCaseOptions<TDependencies, TRequest, TResponse, TError extends DomainError> {
  isAuthRequired: boolean;
  requestSchema?: Schema<TRequest>;
  handler: (
    dependencies: TDependencies, request: TRequest
  ) => Promise<Result<TResponse, TError>>;
}

export function createUseCase<
  TDependencies,
  TRequest,
  TResponse,
  TError extends DomainError,
>(
  options: UseCaseOptions<TDependencies, TRequest, TResponse, TError>
): UseCase<TDependencies, TRequest, TResponse, TError> {
  return {
    isAuthRequired: options.isAuthRequired,
    execute: async (
      dependencies: TDependencies, request: TRequest
    ): Promise<Result<TResponse, UseCaseError<TError>>> => {
      const validationResult = validateRequest(options.requestSchema, request);

      if (!validationResult.ok) return validationResult;

      return options.handler(dependencies, validationResult.value);
    }
  }
}