import type { SchemaNode } from "./types/index.js";

export function enum_(values: readonly string[]) {
  const node: SchemaNode = {
    kind: "enum",
    values,
    rules: {},
  };

  return {
    optional() {
      node.rules.optional = true;
      return this;
    },
    build(): SchemaNode {
      return node;
    },
  };
}