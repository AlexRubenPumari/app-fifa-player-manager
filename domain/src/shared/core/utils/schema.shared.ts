import { z } from "zod";

export const schema = {
  string: z.string,
  number: z.number,
  boolean: z.boolean,
  object: z.object,
  enum: z.enum,
};