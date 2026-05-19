import { InvalidRequestError } from "../../errors";
import { Request, RequestShape, Result } from "../types";
import { createResult, schema } from "./";

export function validateRequest<TShape extends RequestShape>(
  requestShape: TShape,
  request: unknown
): Result<Request<TShape>, InvalidRequestError> {
  const result = schema.object(requestShape).safeParse(request);

  if (!result.success) {
    const issue = result.error.issues[0];
    return createResult.error(new InvalidRequestError(issue.message));
  }
  
  return createResult.ok(result.data as Request<TShape>);
}