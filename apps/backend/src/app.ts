import express from "express"
import { playersRouter } from "./routes"
import { errorHandler } from "./middleware"

export const app = express()

app.use("/v1/players", playersRouter)

app.use(errorHandler)