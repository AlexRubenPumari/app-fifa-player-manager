import { Sequelize } from "sequelize"

const sequelize = new Sequelize("fifa-manager-database", "root", "root123", {
  host: "localhost",
  port: 5000,
  dialect: "mysql",
})

export async function connectDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}