import type { SchemaNode } from "./types/index.js";

export function string() {
  const node: SchemaNode = {
    kind: "string",
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
    email() {
      node.rules.email = true;
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