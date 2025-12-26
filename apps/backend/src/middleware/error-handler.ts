import { Response, Request, NextFunction } from "express"
import { ApiResponseError } from "../types"

export function errorHandler(
  err: unknown, _req: Request, res: Response<ApiResponseError>, _next: NextFunction
) {
  console.error("Error:", err)

  res.status(500).json({ message: "Internal Server Error" })
}