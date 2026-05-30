import type { SchemaNode } from "./types/schema-node.shared.js";

export function number() {
  const node: SchemaNode = {
    kind: "number",
    rules: {},
  };

  return {
    min(value: number) {
      node.rules.min = value;
      return this;
    },
    max(value: number) {
      node.rules.max = value;
      return this;
    },
    int() {
      node.rules.int = true;
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