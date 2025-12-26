export type Result<ValueType, ErrorType> =
  | { success: true, value: ValueType }
  | { success: false, error: ErrorType }