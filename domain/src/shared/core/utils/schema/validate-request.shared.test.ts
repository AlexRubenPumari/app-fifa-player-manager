import { describe, test, expect } from "vitest";
import { schema } from "./index.js";
import { validateRequest } from "./validate-request.shared.js";

describe("validate-request", () => {
  test("should accept valid request", () => {
    const shape = {
      name: schema.string(),
      age: schema.number(),
    };

    const result = validateRequest(shape, {
      name: "John",
      age: 20,
    });

    expect(result.ok).toBe(true);
  });

  test("should reject invalid request", () => {
    const shape = {
      name: schema.string(),
      age: schema.number(),
    };

    const result = validateRequest(shape, {
      name: "John",
      age: "bad",
    });

    expect(result.ok).toBe(false);
  });

  test("should accept optional request field", () => {
    const shape = {
      age: schema.number().optional(),
    };

    const result = validateRequest(shape, {});

    expect(result.ok).toBe(true);
  });

  test("should accept nested request object", () => {
    const shape = {
      profile: schema.object({
        name: schema.string(),
      }),
    };

    const result = validateRequest(shape, {
      profile: {
        name: "John",
      },
    });

    expect(result.ok).toBe(true);
  });
});