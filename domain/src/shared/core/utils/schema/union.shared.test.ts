import { describe, test, expect } from "vitest";
import { union } from "./union.shared.js";
import { string } from "./string.shared.js";
import { number } from "./number.shared.js";
import { boolean } from "./boolean.shared.js";
import { toZod } from "./to-zod.shared.js";

describe("union", () => {
  test("should validate first union type", () => {
    const schema = union([
      string(),
      number(),
    ]).build();

    const result = toZod(schema).safeParse("hello");

    expect(result.success).toBe(true);
  });

  test("should validate second union type", () => {
    const schema = union([
      string(),
      number(),
    ]).build();

    const result = toZod(schema).safeParse(123);

    expect(result.success).toBe(true);
  });

  test("should fail when no union matches", () => {
    const schema = union([
      string(),
      number(),
    ]).build();

    const result = toZod(schema).safeParse(true);

    expect(result.success).toBe(false);
  });

  test("should allow optional union", () => {
    const schema = union([
      string(),
      number(),
    ])
      .optional()
      .build();

    const result = toZod(schema).safeParse(undefined);

    expect(result.success).toBe(true);
  });

  test("should validate nested union", () => {
    const schema = union([
      string(),
      union([
        number(),
        boolean(),
      ]),
    ]).build();

    expect(toZod(schema).safeParse(true).success).toBe(true);
    expect(toZod(schema).safeParse(123).success).toBe(true);
    expect(toZod(schema).safeParse("hello").success).toBe(true);
  });

  test("should fail invalid nested union", () => {
    const schema = union([
      string(),
      number(),
    ]).build();

    const result = toZod(schema).safeParse({});

    expect(result.success).toBe(false);
  });

  test("should validate empty string in union", () => {
    const schema = union([
      string(),
      number(),
    ]).build();

    const result = toZod(schema).safeParse("");

    expect(result.success).toBe(true);
  });

  test("should validate zero in union", () => {
    const schema = union([
      string(),
      number(),
    ]).build();

    const result = toZod(schema).safeParse(0);

    expect(result.success).toBe(true);
  });
});