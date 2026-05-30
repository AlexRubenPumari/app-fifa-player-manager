import { describe, test, expect } from "vitest";
import { record } from "./record.shared.js";
import { string } from "./string.shared.js";
import { number } from "./number.shared.js";
import { toZod } from "./to-zod.shared.js";

describe("record", () => {
  test("should validate valid record", () => {
    const schema = record(
      string(),
      number()
    ).build();

    const result = toZod(schema).safeParse({
      a: 1,
      b: 2,
    });

    expect(result.success).toBe(true);
  });

  test("should fail when value is invalid", () => {
    const schema = record(
      string(),
      number()
    ).build();

    const result = toZod(schema).safeParse({
      a: "hello",
    });

    expect(result.success).toBe(false);
  });

  test("should fail when input is not object", () => {
    const schema = record(
      string(),
      number()
    ).build();

    const result = toZod(schema).safeParse("hello");

    expect(result.success).toBe(false);
  });

  test("should allow empty object", () => {
    const schema = record(
      string(),
      number()
    ).build();

    const result = toZod(schema).safeParse({});

    expect(result.success).toBe(true);
  });

  test("should allow optional record", () => {
    const schema = record(
      string(),
      number()
    )
      .optional()
      .build();

    const result = toZod(schema).safeParse(undefined);

    expect(result.success).toBe(true);
  });

  test("should validate nested records", () => {
    const schema = record(
      string(),
      record(
        string(),
        number()
      )
    ).build();

    const result = toZod(schema).safeParse({
      users: {
        age: 20,
      },
    });

    expect(result.success).toBe(true);
  });

  test("should fail nested invalid record", () => {
    const schema = record(
      string(),
      record(
        string(),
        number()
      )
    ).build();

    const result = toZod(schema).safeParse({
      users: {
        age: "20",
      },
    });

    expect(result.success).toBe(false);
  });

  test("should enforce key schema", () => {
    const schema = record(
      string().min(3),
      number()
    ).build();

    const result = toZod(schema).safeParse({
      ab: 1,
    });

    expect(result.success).toBe(false);
  });
});