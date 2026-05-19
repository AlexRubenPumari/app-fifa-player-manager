import type { z } from "zod";

export type RequestShape = z.ZodRawShape;

export type Request<TShape extends RequestShape> = z.infer<z.ZodObject<TShape>>;