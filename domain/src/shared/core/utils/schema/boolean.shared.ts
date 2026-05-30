import type { SchemaNode } from "./types/schema-node.shared.js";

export function boolean() {
  const node: SchemaNode = {
    kind: "boolean",
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