import { ZodType, lazy } from "zod";
import { Entity, schema, WhereClause } from "../..";
import { filterConditionSchema } from "./filter-condition-schema.shared";

export const whereSchema: ZodType<WhereClause<Entity>> = lazy(() =>
  schema.record(schema.string(), schema.union([schema.any(), filterConditionSchema])).and(
    schema.object({
      AND: schema.union([whereSchema, schema.array(whereSchema)]).optional(),
      OR: schema.array(whereSchema).optional(),
    })
  )
);