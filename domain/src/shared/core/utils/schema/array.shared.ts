import { resolve } from "./resolve.shared.js";
import type { SchemaNode } from "./types/index.js";

export function array(item: any) { //tipar entrada y retorno
  const node: SchemaNode = {
    kind: "array",
    item: resolve(item),
    rules: {},
  };

  return {
    min(value: number) {
      node.rules.min = value;
      return this;
    },
    optional() {
      node.rules.optional = true;
      return this;
    },
    build(): SchemaNode {
      return node;
    },
  };
}