import type { SchemaNode } from "./schema-node.shared.js";

export type SchemaBuilder = {
  build(): SchemaNode;
};