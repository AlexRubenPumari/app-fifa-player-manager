import { DomainError } from "../../errors";
import { Result, Schema, SchemaInput, SchemaOutput, UseCase, UseCaseError } from "../types/core/index";
import { validateRequest } from "./validate-request.shared";

export function createUseCase<
  TDependencies,
  TRequestSchema extends Schema,
  TResponse,
  TError extends DomainError = DomainError,
>(options: {
  isAuthRequired: boolean;
  requestSchema: TRequestSchema;
  handler: (
    dependencies: TDependencies,
    request: SchemaOutput<TRequestSchema>
  ) => Promise<Result<TResponse, TError>>;
}): UseCase<TDependencies, TRequestSchema, TResponse, TError> {
  return {
    isAuthRequired: options.isAuthRequired,

    async execute(
      dependencies: TDependencies,
      request: SchemaInput<TRequestSchema>
    ): Promise<Result<TResponse, UseCaseError<TError>>> {
      const validationResult = validateRequest(options.requestSchema, request);

      if (!validationResult.ok) return validationResult

      return options.handler(dependencies, validationResult.value);
    },
  };
}

