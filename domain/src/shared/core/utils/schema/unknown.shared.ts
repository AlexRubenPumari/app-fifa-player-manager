import type { SchemaNode } from "./types/index.js";

export function unknown() {//todo: resolver los tipados q retornan, seguramente genericos
  const node: SchemaNode = {
    kind: "unknown",
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