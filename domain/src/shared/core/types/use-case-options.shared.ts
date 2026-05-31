import type { DomainError } from "../../../errors/index.js";
import type { SchemaBuilder } from "../utils/schema/types/index.js";
import type { Result } from "./index.js";

export type Schema<TObject> = { //todo: refactor
  [Key in keyof TObject]: SchemaBuilder;
};

export interface UseCaseOptions<
  TDependencies,
  TRequest,
  TResponse,
  TError extends DomainError
> {
  isAuthRequired: boolean;
  requestSchema: Schema<TRequest>;
  handler: (
    dependencies: TDependencies, request: TRequest
  ) => Promise<Result<TResponse, TError>>;
}