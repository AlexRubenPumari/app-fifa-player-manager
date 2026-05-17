import { Result, Schema, SchemaInput, SchemaOutput } from "../types/core/index";
import { createResult } from "./create-result.shared";
import { InvalidRequestError } from "../../errors/index";

export function validateRequest<TSchema extends Schema>(
  schema: TSchema,
  request: SchemaInput<TSchema>
): Result<SchemaOutput<TSchema>, InvalidRequestError> {
  const result = schema.safeParse(request);

  if (!result.success) {
    const issue = result.error.issues[0];
    return createResult.error(new InvalidRequestError(issue.message));
  }

  return createResult.ok(result.data);
}