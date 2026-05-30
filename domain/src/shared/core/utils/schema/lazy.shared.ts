import type { SchemaBuilder, SchemaNode } from "./types/index.js";

export function lazy(getter: () => SchemaBuilder) {
  const node: SchemaNode = {
    kind: "lazy",
    getter: () => getter().build(),
    rules: {},
  };

  return {
    optional() {
      node.rules.optional = true;
      return this;
    },

    build() {
      return node;
    },
  };
}