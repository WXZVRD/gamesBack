import { Sequelize } from 'sequelize';
import dotenv from "dotenv";
dotenv.config()

console.log(process.env.PORT)

export const sequelize = new Sequelize(process.env.DB, {
    dialect: "postgres",
    ssl: true
});
