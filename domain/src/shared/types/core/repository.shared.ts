import { Entity, FilterCondition, LogicOperator } from "../index";

export type FindManyDTO<Type> = {
  where: {
    [Key in keyof Type]?: Type[Key] | FilterCondition<Type[Key]>;
  };
  operator?: LogicOperator;
};

export interface FindOneDTO<Type extends Entity> { id: Type["id"]; }

export interface DeleteDTO<Type extends Entity> { id: Type["id"]; }

export interface SaveDTO<Type extends Entity> { data: Omit<Type, "id">; }

export interface UpdateDTO<Type extends Entity> {
  id: Type["id"];
  data: Partial<Omit<Type, "id">>;
}

export interface Repository<Type extends Entity> {
  findOne(dto: FindOneDTO<Type>): Promise<Type | null>;
  findMany(dto: FindManyDTO<Type>): Promise<Type[]>;
  save(dto: SaveDTO<Type>): Promise<Type>;
  update(dto: UpdateDTO<Type>): Promise<void>;
  delete(dto: DeleteDTO<Type>): Promise<void>;
}