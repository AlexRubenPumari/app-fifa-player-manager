import { describe, test, expect } from "vitest";
import { unknown } from "./unknown.shared.js";
import { toZod } from "./to-zod.shared.js";

describe("unknown", () => {
  test("should validate a string", () => {
    const schema = unknown().build();

    const result = toZod(schema).safeParse("hello");

    expect(result.success).toBe(true);
  });

  test("should validate a number", () => {
    const schema = unknown().build();

    const result = toZod(schema).safeParse(123);

    expect(result.success).toBe(true);
  });

  test("should validate an object", () => {
    const schema = unknown().build();

    const result = toZod(schema).safeParse({
      name: "John",
    });

    expect(result.success).toBe(true);
  });

  test("should validate an array", () => {
    const schema = unknown().build();

    const result = toZod(schema).safeParse([1, 2, 3]);

    expect(result.success).toBe(true);
  });

  test("should validate null", () => {
    const schema = unknown().build();

    const result = toZod(schema).safeParse(null);

    expect(result.success).toBe(true);
  });

  test("should allow optional unknown", () => {
    const schema = unknown().optional().build();

    const result = toZod(schema).safeParse(undefined);

    expect(result.success).toBe(true);
  });

  test("should require value when not optional", () => {
    const schema = unknown().build();

    const result = toZod(schema).safeParse(undefined);

    expect(result.success).toBe(false);
  });
});