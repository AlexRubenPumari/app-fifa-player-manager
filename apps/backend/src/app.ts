  import express from "express"
  import { errorHandler } from "./middleware"
  import { playersRouter } from "./routes"

  import { Sequelize } from "sequelize"
  // function iniciarSequelize() {
  const sequelize = new Sequelize("fifa-manager-database", "root", "root123", {
    host: "localhost",
    port: 5000,
    dialect: "mysql",
  })
  // }

  const app = express()
  const PORT: number = 3000

  app.use("/v1/players", playersRouter)

  app.use(errorHandler)

  conectarSequelize()

  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })


  async function conectarSequelize() {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }