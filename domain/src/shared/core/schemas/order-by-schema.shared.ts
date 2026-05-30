import { orderDirections } from "../../index.js";
import { schema } from "../utils/schema/index.js";

const orderDirectionSchema = schema.enum(orderDirections);

const orderByClauseSchema = schema.record(
  schema.string(),
  orderDirectionSchema
);

export const orderBySchema = schema.union([
  orderByClauseSchema,
  schema.array(orderByClauseSchema),
]);