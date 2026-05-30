import { describe, test, expect } from "vitest";
import { number } from "./number.shared.js"
import { string } from "./string.shared.js"
import { object } from "./object.shared.js"
import { toZod } from "./to-zod.shared.js"

describe("object", () => {
  test("should validate valid object", () => {
    const schema = object({
      name: string(),
      age: number(),
    }).build();

    const result = toZod(schema).safeParse({
      name: "John",
      age: 30,
    });

    expect(result.success).toBe(true);
  });

  test("should fail invalid field", () => {
    const schema = object({
      name: string(),
      age: number(),
    }).build();

    const result = toZod(schema).safeParse({
      name: "John",
      age: "30",
    });

    expect(result.success).toBe(false);
  });

  test("should validate nested object", () => {
    const schema = object({
      profile: object({
        name: string(),
      }),
    }).build();

    const result = toZod(schema).safeParse({
      profile: {
        name: "John",
      },
    });

    expect(result.success).toBe(true);
  });

  test("should reject invalid nested object", () => {
    const schema = object({
      profile: object({
        age: number(),
      }),
    }).build();

    const firstResult = toZod(schema).safeParse({
      profile: {
        age: "bad",
      },
    });
    const secondResult = toZod(schema).safeParse({
      profile: {},
    });

    expect(firstResult.success).toBe(false);
    expect(secondResult.success).toBe(false);
  });

  test("should fail when required field is missing", () => {
    const schema = object({
      name: string(),
      age: number(),
    }).build();

    const result = toZod(schema).safeParse({
      name: "John",
    });

    expect(result.success).toBe(false);
  });

  test("should support optional fields", () => {
    const schema = object({
      name: string(),
      age: number().optional(),
    }).build();

    const result = toZod(schema).safeParse({
      name: "John",
    });

    expect(result.success).toBe(true);
  });

  test("should allow optional object", () => {
    const schema = object({
      name: string(),
    }).optional().build();

    const result = toZod(schema).safeParse(undefined);

    expect(result.success).toBe(true);
  });

  test("should validate non-empty object", () => {
    const schema = object({
      name: string().optional(),
      age: number().optional(),
    }).nonEmpty().build();

    const result = toZod(schema).safeParse({
      name: "John",
    });

    expect(result.success).toBe(true);
  });

  test("should reject empty object when nonEmpty is enabled", () => {
    const schema = object({
      name: string().optional(),
      age: number().optional(),
    }).nonEmpty().build();

    const result = toZod(schema).safeParse({});

    expect(result.success).toBe(false);
  });

  test("should allow object with at least one defined property", () => {
    const schema = object({
      name: string().optional(),
      age: number().optional(),
    }).nonEmpty().build();

    const result = toZod(schema).safeParse({
      age: 30,
    });

    expect(result.success).toBe(true);
  });
});
