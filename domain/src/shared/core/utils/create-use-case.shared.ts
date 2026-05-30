import type { Result, UseCase, UseCaseError, UseCaseOptions } from "../types/index.js";
import { DomainError } from "../../../errors/index.js";
import { validateRequest } from "./schema/index.js";

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

      return options.handler(dependencies, validationResult.value); //todo cambiar el tipo result
    }
  }
}