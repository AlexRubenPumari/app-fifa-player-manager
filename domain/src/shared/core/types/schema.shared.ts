import { ZodOptional, ZodType } from "zod";

type SchemaField<T> = ZodType<T>;
type OptionalSchemaField<T> = ZodOptional<SchemaField<T>>;

export type Schema<TObject> = {
  [Key in RequiredKeys<TObject>]: SchemaField<TObject[Key]>;
} & {
  [Key in OptionalKeys<TObject>]: OptionalSchemaField<Exclude<TObject[Key], undefined>>;
};

type OptionalKeys<TObject> = {
  [Key in keyof TObject]-?: {} extends Pick<TObject, Key> ? Key : never
}[keyof TObject];

type RequiredKeys<TObject> = Exclude<keyof TObject, OptionalKeys<TObject>>;