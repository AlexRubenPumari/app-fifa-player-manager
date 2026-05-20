import { z } from "zod";

export const schema = {
  string: z.string,
  number: z.number,
  boolean: z.boolean,
  object: z.object,
  enum: z.enum,
  array: z.array,
  any: z.any,
  record: z.record,
  union: z.union,
};