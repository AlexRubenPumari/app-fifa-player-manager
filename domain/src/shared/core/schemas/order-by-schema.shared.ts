import { orderDirections, schema } from "../..";

const orderDirectionSchema = schema.enum(orderDirections);

const orderByClauseSchema = schema.record(
  schema.string(),
  orderDirectionSchema
);

export const orderBySchema = schema.union([
  orderByClauseSchema,
  schema.array(orderByClauseSchema),
]);