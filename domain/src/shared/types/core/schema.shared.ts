import { z } from "zod";

export type Schema = z.ZodTypeAny;

export type SchemaInput<TSchema extends Schema> = z.input<TSchema>;

export type SchemaOutput<TSchema extends Schema> = z.output<TSchema>;