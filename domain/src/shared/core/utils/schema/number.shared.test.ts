import { describe, test, expect } from "vitest";
import { number } from "./number.shared.js"
import { toZod } from "./to-zod.shared.js"

describe("number", () => {
  test("should validate a valid number", () => {
    const schema = number().build();

    const result = toZod(schema).safeParse(10);

    expect(result.success).toBe(true);
  });

  test("should fail when input is not a number", () => {
    const schema = number().build();

    const result = toZod(schema).safeParse("10");

    expect(result.success).toBe(false);
  });

  test("should enforce min value", () => {
    const schema = number().min(5).build();

    const result = toZod(schema).safeParse(3);

    expect(result.success).toBe(false);
  });

  test("should allow exact min value", () => {
    const schema = number().min(5).build();

    const result = toZod(schema).safeParse(5);

    expect(result.success).toBe(true);
  });

  test("should enforce max value", () => {
    const schema = number().max(5).build();

    const result = toZod(schema).safeParse(10);

    expect(result.success).toBe(false);
  });

  test("should allow exact max value", () => {
    const schema = number().max(5).build();

    const result = toZod(schema).safeParse(5);

    expect(result.success).toBe(true);
  });

  test("should reject not integer number", () => {
    const schema = number().int().build();

    const result = toZod(schema).safeParse(3.14);

    expect(result.success).toBe(false);
  });

  test("should allow integer number", () => {
    const schema = number().int().build();

    const result = toZod(schema).safeParse(10);

    expect(result.success).toBe(true);
  });

  test("should allow optional number", () => {
    const schema = number().optional().build();

    const result = toZod(schema).safeParse(undefined);

    expect(result.success).toBe(true);
  });

  test("should validate combined number rules", () => {
    const schema = number().int().min(1).max(10).build();

    const result = toZod(schema).safeParse(5);

    expect(result.success).toBe(true);
  });
});