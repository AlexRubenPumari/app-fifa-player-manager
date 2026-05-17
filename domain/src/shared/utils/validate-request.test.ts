import { describe, test, expect } from "vitest";
import { z as schema } from "zod";
import { validateRequest } from "./validate-request.shared";
import { InvalidRequestError } from "../../errors";

describe("validate-request", () => {
  test("should return ok with validated data when schema validation succeeds", () => {
    const requestSchema = schema.object({ name: schema.string(), age: schema.number() });
    const request = { name: "john", age: 30 };

    const result = validateRequest(requestSchema, request);

    expect(result).toEqual({
      ok: true,
      value: { name: "john", age: 30 },
    });
  });

  test("should return result with invalid-request error when schema validation fails", () => {
    type Request = schema.infer<typeof requestSchema>;

    const requestSchema = schema.object({ name: schema.string(), age: schema.number() });
    const request = { name: 123, age: 30 } as unknown as Request;

    const result = validateRequest(requestSchema, request);

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBeInstanceOf(InvalidRequestError);
    }
  });

  test("should preserve the error message from schema validation", () => {
    type Request = schema.infer<typeof requestSchema>;

    const requestSchema = schema.object({ name: schema.string({ error: "name is required" }).min(1), age: schema.number() });
    const request = { age: 30 } as unknown as Request;

    const result = validateRequest(requestSchema, request);

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.message).toBe("name is required");
    }
  });
});