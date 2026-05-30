import type { SchemaBuilder, SchemaNode } from "./types/index.js";

export function union(options: SchemaBuilder[]) {
  const node: SchemaNode = {
    kind: "union",
    options: options.map(option => option.build()),
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