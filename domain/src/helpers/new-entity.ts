import type { Entity } from "../helpers"

export type New<EntityType extends Entity> = Omit<EntityType, "id">