import { schema, searchTypes } from "../..";

export const filterConditionSchema = schema.object({
  value: schema.any(),
  type: schema.enum(searchTypes)
});