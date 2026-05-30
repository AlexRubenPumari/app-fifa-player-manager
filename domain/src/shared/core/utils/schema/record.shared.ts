import type { SchemaBuilder, SchemaNode } from "./types/index.js";

export function record(key: SchemaBuilder, value: SchemaBuilder) {
  const node: SchemaNode = {
    kind: "record",
    key: key.build(),
    value: value.build(),
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