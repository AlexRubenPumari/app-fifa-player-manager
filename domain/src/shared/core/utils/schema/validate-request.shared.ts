import type { SchemaBuilder } from "./types/index.js";
import type { Result } from "../../types/index.js";
import { InvalidRequestError } from "../../../../errors/index.js";
import { toZod } from "./to-zod.shared.js";
import { schema } from "./index.js";
import { createResult } from "../index.js";

export function validateRequest<TRequest>(
  requestShape: Record<string, SchemaBuilder>,
  request: TRequest
): Result<TRequest, InvalidRequestError> {
  const requestSchema = schema.object(requestShape).build();

  const zodSchema = toZod(requestSchema);

  const result = zodSchema.safeParse(request);

  if (!result.success) return createResult.error(new InvalidRequestError())

  return createResult.ok<TRequest>(request);
}