import type { SchemaNode } from "./types/schema-node.shared.js";
import { describe, test, expect } from "vitest";
import { lazy } from "./lazy.shared.js";
import { object } from "./object.shared.js";
import { union } from "./union.shared.js";
import { string } from "./string.shared.js";
import { array } from "./array.shared.js";
import { toZod } from "./to-zod.shared.js";

describe("lazy", () => {
  test("should validate recursive object", () => {
    const treeSchema: SchemaNode = lazy(() =>
      object({
        value: string(),
        children: array(treeSchema).optional(),
      })
    ).build();

    const result = toZod(treeSchema).safeParse({
      value: "root",
      children: [
        {
          value: "child",
        },
      ],
    });

    expect(result.success).toBe(true);
  });

  test("should fail when recursive child is invalid", () => {
    const treeSchema: SchemaNode = lazy(() =>
      object({
        value: string(),
        children: array(treeSchema).optional(),
      })
    ).build();

    const result = toZod(treeSchema).safeParse({
      value: "root",
      children: [
        {
          value: 123,
        },
      ],
    });

    expect(result.success).toBe(false);
  });

  test("should validate deeply nested recursive structures", () => {
    const treeSchema: SchemaNode = lazy(() =>
      object({
        value: string(),
        children: array(treeSchema).optional(),
      })
    ).build();

    const result = toZod(treeSchema).safeParse({
      value: "a",
      children: [
        {
          value: "b",
          children: [
            {
              value: "c",
              children: [
                {
                  value: "d",
                },
              ],
            },
          ],
        },
      ],
    });

    expect(result.success).toBe(true);
  });

  test("should support recursive union schemas", () => {
    const expressionSchema: SchemaNode = lazy(() =>
      union([
        string(),
        object({
          operator: string(),
          operands: array(expressionSchema),
        }),
      ])
    ).build();

    const result = toZod(expressionSchema).safeParse({
      operator: "+",
      operands: [
        "a",
        {
          operator: "*",
          operands: ["b", "c"],
        },
      ],
    });

    expect(result.success).toBe(true);
  });

  test("should fail invalid recursive union schemas", () => {
    const expressionSchema: SchemaNode = lazy(() =>
      union([
        string(),
        object({
          operator: string(),
          operands: array(expressionSchema),
        }),
      ])
    ).build();

    const result = toZod(expressionSchema).safeParse({
      operator: "+",
      operands: [
        "a",
        {
          operator: "*",
          operands: [123],
        },
      ],
    });

    expect(result.success).toBe(false);
  });

  test("should allow optional lazy schema", () => {
    const recursiveSchema = lazy(() =>
      object({
        value: string(),
      })
    )
      .optional()
      .build();

    const result = toZod(recursiveSchema).safeParse(undefined);

    expect(result.success).toBe(true);
  });

  test("should fail invalid root recursive object", () => {
    const treeSchema: SchemaNode = lazy(() =>
      object({
        value: string(),
        children: array(treeSchema).optional(),
      })
    ).build();

    const result = toZod(treeSchema).safeParse({
      value: 123,
    });

    expect(result.success).toBe(false);
  });

  test("should validate recursive arrays", () => {
    const nestedArraySchema: SchemaNode = lazy(() =>
      union([
        string(),
        array(nestedArraySchema),
      ])
    ).build();

    const result = toZod(nestedArraySchema).safeParse([
      "a",
      [
        "b",
        [
          "c",
        ],
      ],
    ]);

    expect(result.success).toBe(true);
  });

  test("should fail invalid recursive arrays", () => {
    const nestedArraySchema: SchemaNode = lazy(() =>
      union([
        string(),
        array(nestedArraySchema),
      ])
    ).build();

    const result = toZod(nestedArraySchema).safeParse([
      "a",
      [
        123,
      ],
    ]);

    expect(result.success).toBe(false);
  });

  test("should not execute lazy getter before parsing", () => {
    let called = false;

    const recursiveSchema: SchemaNode = lazy(() => {
      called = true;

      return object({
        value: string(),
      });
    }).build();

    expect(called).toBe(false);

    toZod(recursiveSchema).safeParse({
      value: "test",
    });

    expect(called).toBe(true);
  });
});