import { string, number, boolean, object, enum as enum_, array, any, record, union, email, ZodType } from "zod";
import { Email } from "../..";

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
  email: (params?: Parameters<typeof email>[0]): ZodType<Email> => email() as ZodType<Email>,
};