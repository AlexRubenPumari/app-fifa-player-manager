import type { BaseRules } from "./base-rules.shared.js";

export type SchemaNode =
  | { kind: "string"; rules: BaseRules & { min?: number; max?: number; email?: boolean } }
  | { kind: "number"; rules: BaseRules & { min?: number; max?: number; int?: boolean } }
  | { kind: "unknown"; rules: BaseRules }
  | { kind: "boolean"; rules: BaseRules }
  | { kind: "enum"; values: readonly string[]; rules: BaseRules }
  | { kind: "array"; item: SchemaNode; rules: BaseRules & { min?: number } }
  | { kind: "object"; shape: Record<string, SchemaNode>; rules: BaseRules & { nonEmpty?: boolean } }
  | { kind: "record"; key: SchemaNode; value: SchemaNode; rules: BaseRules }
  | { kind: "lazy"; getter: () => SchemaNode; rules: BaseRules }
  | { kind: "union"; options: SchemaNode[]; rules: BaseRules };