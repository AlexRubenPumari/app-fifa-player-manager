import type { SchemaBuilder } from "./types/schema-builder.shared.js";
import type { SchemaNode } from "./types/schema-node.shared.js";
// todo: agregar tests y mejorar nombre: buildSchemaNode MEJOR: toSchemaNode(...)
export function resolve(schema: SchemaNode | SchemaBuilder): SchemaNode {
  return "build" in schema
    ? schema.build()
    : schema;
}