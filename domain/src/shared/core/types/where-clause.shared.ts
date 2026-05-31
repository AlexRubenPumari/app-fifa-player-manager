import type { Entity } from "../types/index.js";

type FilterOperator<TValue> =
  | TValue
  | {
      equals?: TValue;
      contains?: TValue extends string ? string : never;
      gt?: TValue extends number ? number : never;
      gte?: TValue extends number ? number : never;
      lt?: TValue extends number ? number : never;
      lte?: TValue extends number ? number : never;
    };

type FieldWhereClause<TEntity extends Entity> = {
  [Key in keyof TEntity]?: FilterOperator<TEntity[Key]>;
};

interface AndWhereClause<TEntity extends Entity> {
  AND: WhereClause<TEntity>[];
}

interface OrWhereClause<TEntity extends Entity> {
  OR: WhereClause<TEntity>[];
}

export type WhereClause<TEntity extends Entity> =
  | FieldWhereClause<TEntity>
  | AndWhereClause<TEntity>
  | OrWhereClause<TEntity>;