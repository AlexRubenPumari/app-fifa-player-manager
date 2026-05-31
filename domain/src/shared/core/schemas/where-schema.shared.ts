import { schema } from "../utils/schema/index.js";

export const whereSchema = schema.lazy(() =>//corregir: where-clause-schema
  schema.union([fieldWhereSchema, andWhereSchema, orWhereSchema])
);

const filterOperatorSchema = schema.object({
  equals: schema.unknown().optional(),
  contains: schema.string().optional(),
  gt: schema.number().optional(),
  gte: schema.number().optional(),
  lt: schema.number().optional(),
  lte: schema.number().optional(),
}).nonEmpty();

const fieldWhereSchema = schema.record(
  schema.string(),
  schema.union([
    schema.unknown(),
    filterOperatorSchema,
  ]),
);

const andWhereSchema = schema.object({
  AND: schema.array(whereSchema).min(2),
});

const orWhereSchema = schema.object({
  OR: schema.array(whereSchema).min(2),
});