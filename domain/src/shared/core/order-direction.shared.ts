import { schema } from "../index";

const orderDirections = ["asc", "desc"] as const;

export const orderDirectionSchema = schema.enum(orderDirections);