import { describe, test, expect } from "vitest";
import { string } from "./string.shared.js"
import { array } from "./array.shared.js"
import { object } from "./object.shared.js";
import { enum_ } from "./enum.shared.js";
import { toZod } from "./to-zod.shared.js" //todo: importar todo desde schema?

describe("array", () => {//todo: revisar todos string minusculas
  test("should validate array of strings", () => {
    const schema = array(string()).build();

    const result = toZod(schema).safeParse(["a", "b"]);

    expect(result.success).toBe(true);
  });

  test("should reject invalid array item", () => {
    const schema = array(string()).build();

    const result = toZod(schema).safeParse(["a", 1]);

    expect(result.success).toBe(false);
  });

  test("should validate empty array", () => {
    const schema = array(string()).build();

    const result = toZod(schema).safeParse([]);

    expect(result.success).toBe(true);
  });

  test("should reject non array value", () => {
    const schema = array(string()).build();

    const result = toZod(schema).safeParse("abc");

    expect(result.success).toBe(false);
  });

  test("should validate array of objects", () => {
    const schema = array(
      object({
        name: string(),
      })
    ).build();

    const result = toZod(schema).safeParse([
      { name: "John" }
    ]);

    expect(result.success).toBe(true);
  });

  test("should validate array with minimum length", () => {
    const schema = array(string()).min(2).build();

    const result = toZod(schema).safeParse(["a", "b"]);

    expect(result.success).toBe(true);
  });

  test("should reject array shorter than minimum length", () => {
    const schema = array(string()).min(2).build();

    const result = toZod(schema).safeParse(["a"]);

    expect(result.success).toBe(false);
  });

  test("should validate array of enum values", () => {
    const arraySchema = array(
      enum_(["goalkeeper", "defender", "midfielder"])
    ).build();

    const result = toZod(arraySchema).safeParse([
      "goalkeeper",
      "defender",
    ]);

    expect(result.success).toBe(true);
  });

  test("should reject invalid enum value in array", () => {
    const arraySchema = array(
      enum_(["goalkeeper", "defender", "midfielder"])
    ).build();

    const result = toZod(arraySchema).safeParse([
      "goalkeeper",
      "invalid",
    ]);

    expect(result.success).toBe(false);
  });

  test("should allow optional array", () => {
    const schema = array(string()).optional().build();

    const result = toZod(schema).safeParse(undefined);

    expect(result.success).toBe(true);
  });

  test("should allow undefined when optional array has minimum length", () => {
    const schema = array(string())
      .min(1)
      .optional()
      .build();

    const result = toZod(schema).safeParse(undefined);

    expect(result.success).toBe(true);
  });
});