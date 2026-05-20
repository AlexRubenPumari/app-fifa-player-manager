import { schema, SearchType, searchTypes } from "../index";

export interface FilterCondition<TValue> {
  value: TValue;
  type: SearchType;
}

export const filterConditionSchema = schema.object({
  value: schema.any(),
  type: schema.enum(searchTypes)
});