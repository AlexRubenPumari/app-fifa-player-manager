import { describe, test, expect } from "vitest";
import { boolean } from "./boolean.shared.js"
import { toZod } from "./to-zod.shared.js"

describe("boolean", () => {
  test("should validate boolean true", () => {
    const schema = boolean().build();

    const result = toZod(schema).safeParse(true);

    expect(result.success).toBe(true);
  });

  test("should validate boolean false", () => {
    const schema = boolean().build();

    const result = toZod(schema).safeParse(false);

    expect(result.success).toBe(true);
  });

  test("should reject non boolean", () => {
    const schema = boolean().build();

    const result = toZod(schema).safeParse("true");

    expect(result.success).toBe(false);
  });

  test("should allow optional boolean", () => {
    const schema = boolean().optional().build();

    const result = toZod(schema).safeParse(undefined);

    expect(result.success).toBe(true);
  });

  test("should reject invalid optional boolean", () => {
    const schema = boolean().optional().build();

    const result = toZod(schema).safeParse("true");

    expect(result.success).toBe(false);
  });
});