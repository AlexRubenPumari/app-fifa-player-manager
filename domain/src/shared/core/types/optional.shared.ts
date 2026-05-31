export type Optional<TObject extends object> = {
  [Key in keyof TObject]?: TObject[Key] | undefined;
};