import type { SchemaBuilder, SchemaNode } from "./types/index.js";

export function object(shape: Record<string, SchemaBuilder>) {
  const node: SchemaNode = {
    kind: "object",
    shape: Object.fromEntries(
      Object.entries(shape).map(([key, value]) => [key, value.build()])
    ),
    rules: {},
  };

  return {
    nonEmpty() {
      node.rules.nonEmpty = true;
      return this;
    },
    optional() {
      node.rules.optional = true;
      return this;
    },
    build() {
      return node;
    },
  };
}