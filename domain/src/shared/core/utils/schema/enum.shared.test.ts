import { describe, test, expect } from "vitest";
import { enum_ } from "./enum.shared.js"
import { toZod } from "./to-zod.shared.js"

describe("enum", () => {
  test("should validate allowed value", () => {
    const schema = enum_(["a", "b", "c"] as const).build();

    const result = toZod(schema).safeParse("a");

    expect(result.success).toBe(true);
  });

  test("should reject invalid value", () => {
    const schema = enum_(["a", "b", "c"] as const).build();

    const result = toZod(schema).safeParse("d");

    expect(result.success).toBe(false);
  });

  test("should validate last enum value", () => {
    const schema = enum_(["a", "b", "c"] as const).build();

    const result = toZod(schema).safeParse("c");

    expect(result.success).toBe(true);
  });

  test("should reject non-string enum value", () => {
    const schema = enum_(["a", "b"]).build();

    const result = toZod(schema).safeParse(1);

    expect(result.success).toBe(false);
  });

  test("should allow optional enum", () => {
    const schema = enum_(["a", "b"] as const).optional().build();

    const result = toZod(schema).safeParse(undefined);

    expect(result.success).toBe(true);
  });
});