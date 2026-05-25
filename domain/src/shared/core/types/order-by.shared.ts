export const orderDirections = ["asc", "desc"] as const;

export type OrderBy<TEntity> = {
  [Key in keyof TEntity]?: typeof orderDirections[number];
};