import type { Entity, Optional, OrderBy, WhereClause } from "../index.js";//todo: order-by-clause

export type FindManyDTO<TEntity extends Entity> = {
  where?: WhereClause<TEntity> | undefined;
  take: number;
  skip: number;
  orderBy?: OrderBy<TEntity> | OrderBy<TEntity>[] | undefined;
};

export interface FindOneDTO<TEntity extends Entity> {
  where: WhereClause<TEntity>;
}

export interface FindManyResult<TEntity> {
  data: TEntity[];
  total: number;
}

export interface DeleteDTO<TEntity extends Entity> { id: TEntity["id"]; }

export type SaveDTO<TEntity extends Entity> = Omit<TEntity, "id">;

export interface UpdateDTO<TEntity extends Entity> {
  id: TEntity["id"];
  data: Optional<Omit<TEntity, "id">>;
}