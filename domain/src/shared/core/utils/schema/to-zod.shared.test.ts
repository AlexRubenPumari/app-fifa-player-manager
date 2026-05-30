import { object as zodObject } from "zod";
import { describe, test, expect } from "vitest";
import { string } from "./string.shared.js"
import { number } from "./number.shared.js"
import { boolean } from "./boolean.shared.js"
import { array } from "./array.shared.js"
import { enum_ } from "./enum.shared.js"
import { object } from "./object.shared.js";
import { toZod } from "./to-zod.shared.js" //todo: corregir tests, agregar cosas q no funcan, capaz agregupar en describe

describe("to-zod", () => {
  test("should accept valid string", () => {
    const schema = string().min(2).build();

    const result = toZod(schema).safeParse("hi");

    expect(result.success).toBe(true);
  });

  test("should reject invalid number", () => {
    const schema = number().min(10).build();

    const result = toZod(schema).safeParse(5);

    expect(result.success).toBe(false);
  });

  test("should accept valid boolean", () => {
    const schema = boolean().build();

    const result = toZod(schema).safeParse(true);

    expect(result.success).toBe(true);
  });

  test("should accept valid array", () => {
    const schema = array(string()).build();

    const result = toZod(schema).safeParse(["a"]);

    expect(result.success).toBe(true);
  });

  test("should accept valid enum", () => {
    const schema = enum_(["a", "b"] as const).build();

    const result = toZod(schema).safeParse("a");

    expect(result.success).toBe(true);
  });

  test("should accept valid nested object", () => {
    const schema = {
      name: string(),
      age: number(),
    };

    const zodSchema = zodObject(
      Object.fromEntries(
        Object.entries(schema).map(([key, value]) => [key, toZod(value.build())])
      )
    );

    const result = zodSchema.safeParse({
      name: "John",
      age: 30,
    });

    expect(result.success).toBe(true);
  });

  test("should accept valid deeply nested schema", () => {
    const schema = object({
      users: array(
        object({
          name: string(),
          age: number().optional(),
        })
      ),
    }).build();

    const result = toZod(schema).safeParse({
      users: [
        {
          name: "John",
        },
      ],
    });

    expect(result.success).toBe(true);
  });

  test("should reject invalid deeply nested schema", () => {
    const schema = object({
      users: array(
        object({
          age: number(),
        })
      ),
    }).build();

    const result = toZod(schema).safeParse({
      users: [
        {
          age: "bad",
        },
      ],
    });

    expect(result.success).toBe(false);
  });

  test("should accept 'undefined' for optional schema", () => {
    const schema = string().optional().build();

    const result = toZod(schema).safeParse(undefined);

    expect(result.success).toBe(true);
  });
});