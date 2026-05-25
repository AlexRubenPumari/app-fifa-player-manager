import { SearchType } from "../../index";

export interface FilterCondition<TValue> {
  value: TValue;
  type: SearchType;
}