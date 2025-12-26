interface ApiResponseSuccess<DataType extends Record<string, unknown>> {
  data: DataType,
  message?: string,
}

export interface ApiResponseError {
  message: string,
}

export type ApiResponse<DataType extends Record<string, unknown>> =
  ApiResponseSuccess<DataType> | ApiResponseError