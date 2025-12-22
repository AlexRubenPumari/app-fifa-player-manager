import type { Entity, New, Updatable } from "../helpers"

type Id = Entity["id"]

export interface FindOneOptions {
  id: Id
}

export interface FindManyOptions {
  page?: number,
  pageSize?: number,
}

export interface Repository<EntityType extends Entity> {
  findOne: (options: FindOneOptions) => Promise<EntityType | null>,
  findMany: (options: FindManyOptions) => Promise<EntityType[]>,
  save: (entity: New<EntityType>) => Promise<Id>,
  update: (entity: Updatable<EntityType>) => Promise<void>,
  delete: (entity: EntityType) => Promise<void>,
}