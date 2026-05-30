import { z } from "zod";
import type { SchemaNode } from "./types/index.js";

export function toZod(node: SchemaNode): z.ZodTypeAny {
  let schema: z.ZodTypeAny;

  switch (node.kind) {
    case "string": {//todo: resolver q hacer con las llaves
      let s = z.string();
      if (node.rules.min !== undefined) s = s.min(node.rules.min);
      if (node.rules.max !== undefined) s = s.max(node.rules.max);
      if (node.rules.email) s = s.email();
      schema = s;
      break;
    }

    case "number": {
      let n = z.number();
      if (node.rules.int) n = n.int();
      if (node.rules.min !== undefined) n = n.min(node.rules.min);
      if (node.rules.max !== undefined) n = n.max(node.rules.max);
      schema = n;
      break;
    }

    case "unknown":
      schema = z.unknown().refine(value => value !== undefined)
      break;

    case "boolean":
      schema = z.boolean();
      break;

    case "enum":
      schema = z.enum(node.values as any);
      break;

    case "array":
      let arraySchema = z.array(toZod(node.item));

      if (node.rules.min !== undefined) arraySchema = arraySchema.min(node.rules.min);

      schema = arraySchema;
      break;

    case "record":
      schema = z.record(
        toZod(node.key) as z.ZodString,
        toZod(node.value)
      );
      break;

    case "union":
      schema = z.union(
        node.options.map(option => toZod(option)) as [
          z.ZodTypeAny,
          z.ZodTypeAny,
          ...z.ZodTypeAny[]
        ]
      );
      break;

    case "lazy":
      schema = z.lazy(() => toZod(node.getter()));
      break;

    case "object": {
      const shape: Record<string, z.ZodTypeAny> = {};

      for (const [key, value] of Object.entries(node.shape)) {
        let zodValue = toZod(value);

        if (value?.rules?.optional) {
          zodValue = zodValue.optional();
        }

        shape[key] = zodValue;
      }

      let objectSchema = z.object(shape);

      if (node.rules.nonEmpty) {
        objectSchema = objectSchema.refine(
          value => Object.values(value).some(v => v !== undefined),
          {
            message: "Object cannot be empty",
          },
        );
      }

      schema = objectSchema;

      break;
    }
  }

  if (node.rules?.optional) {
    return schema.optional();
  }

  return schema;
}