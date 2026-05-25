import { Entity, FilterCondition, OrderBy } from "../index";

export type WhereClause<TEntity extends Entity> = {
  [Key in keyof TEntity]?: TEntity[Key] | FilterCondition<TEntity[Key]>;
} & {
  AND?: WhereClause<TEntity> | WhereClause<TEntity>[];
  OR?: WhereClause<TEntity>[];
};

export type FindManyDTO<TEntity extends Entity> = {
  where?: WhereClause<TEntity>;
  take: number;
  skip: number;
  orderBy?: OrderBy<TEntity> | OrderBy<TEntity>[];
};

export interface FindManyResult<TEntity> {
  data: TEntity[];
  total: number;
}

export interface FindOneDTO<TEntity extends Entity> { id: TEntity["id"]; }

export interface DeleteDTO<TEntity extends Entity> { id: TEntity["id"]; }

export interface SaveDTO<TEntity extends Entity> { data: Omit<TEntity, "id">; }

export interface UpdateDTO<TEntity extends Entity> {
  id: TEntity["id"];
  data: Partial<Omit<TEntity, "id">>;
}