import type { Entity } from "../helpers"

export type Updatable<EntityType extends Entity> = Omit<Partial<EntityType>, "id"> & { id: EntityType["id"] }