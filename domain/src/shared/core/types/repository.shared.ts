import type { DeleteDTO, Entity, FindManyDTO, FindManyResult, FindOneDTO, SaveDTO, UpdateDTO } from "../../index.js";

export interface Repository<TEntity extends Entity> {
  findOne(dto: FindOneDTO<TEntity>): Promise<TEntity | null>;
  findMany(dto: FindManyDTO<TEntity>): Promise<FindManyResult<TEntity>>;
  save(dto: SaveDTO<TEntity>): Promise<TEntity>;
  update(dto: UpdateDTO<TEntity>): Promise<void>;
  delete(dto: DeleteDTO<TEntity>): Promise<void>;
}