import { AtLeastOne } from "./"

export type Result<ValueType, ErrorType> =
  { success: boolean } & AtLeastOne<{ value?: ValueType, error?: ErrorType }>