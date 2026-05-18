import { SearchType } from "../search-type.shared";

export interface FilterCondition<ValueType> {
  value: ValueType;
  type: SearchType;
}