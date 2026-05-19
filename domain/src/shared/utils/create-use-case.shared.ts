import { Result, UseCase, UseCaseError, Request, RequestShape } from "../types";
import { DomainError } from "../../errors";
import { validateRequest } from "../utils";

export function createUseCase<
  TDependencies,
  TResponse,
  TError extends DomainError,
>() {
  return function <
    TShape extends RequestShape
  >(options: {
    isAuthRequired: boolean;

    requestShape: TShape;

    handler: (
      deps: TDependencies,
      request: Request<TShape>,
    ) => Promise<Result<TResponse, TError>>;
  }): UseCase<TDependencies, TResponse, TError, TShape> {
    return {
      isAuthRequired: options.isAuthRequired,

      async execute(
        dependencies: TDependencies,
        request: Request<TShape>,
      ): Promise<Result<TResponse, UseCaseError<TError>>> {
        const validationResult = validateRequest(options.requestShape, request);

        if (!validationResult.ok) return validationResult;

        return options.handler(dependencies, validationResult.value);
      },
    };
  };
}