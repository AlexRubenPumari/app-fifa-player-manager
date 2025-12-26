import express from "express"
import { errorHandler } from "./middleware"
import { playersRouter } from "./routes"

const app = express()
const PORT: number = 3000

app.use("/v1/players", playersRouter)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})