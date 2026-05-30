import { describe, test, expect } from "vitest";
import { string } from "./string.shared.js"
import { toZod } from "./to-zod.shared.js"

describe("string", () => {
  test("should validate a valid string", () => {
    const schema = string().build();

    const result = toZod(schema).safeParse("hello");

    expect(result.success).toBe(true);
  });

  test("should fail when input is not a string", () => {
    const schema = string().build();

    const result = toZod(schema).safeParse(123);

    expect(result.success).toBe(false);
  });

  test("should enforce min length", () => {
    const schema = string().min(3).build();

    const result = toZod(schema).safeParse("hi");

    expect(result.success).toBe(false);
  });

  test("should allow string with exact min length", () => {
    const schema = string().min(3).build();

    const result = toZod(schema).safeParse("hey");

    expect(result.success).toBe(true);
  });

  test("should enforce max length", () => {
    const schema = string().max(2).build();

    const result = toZod(schema).safeParse("hello");

    expect(result.success).toBe(false);
  });

  test("should allow string with exact max length", () => {
    const schema = string().max(3).build();

    const result = toZod(schema).safeParse("hey");

    expect(result.success).toBe(true);
  });

  test("should reject invalid email", () => {
    const schema = string().email().build();

    const result = toZod(schema).safeParse("not-email");

    expect(result.success).toBe(false);
  });

  test("should allow valid email", () => {
    const schema = string().email().build();

    const result = toZod(schema).safeParse("test@mail.com");

    expect(result.success).toBe(true);
  });

  test("should allow optional string", () => {
    const schema = string().optional().build();

    const result = toZod(schema).safeParse(undefined);

    expect(result.success).toBe(true);
  });

  test("should validate combined string rules", () => {
    const schema = string().min(3).max(10).email().build();

    const result = toZod(schema).safeParse("a@b.com");

    expect(result.success).toBe(true);
  });
});