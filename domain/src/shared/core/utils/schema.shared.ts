import { string, number, boolean, object, enum as enum_, array, any, record, union } from "zod";

export const schema = {
  string: string,
  number: number,
  boolean: boolean,
  object: object,
  enum: enum_,
  array: array,
  any: any,
  record: record,
  union: union,
};