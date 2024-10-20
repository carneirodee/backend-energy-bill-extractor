import pg from 'pg'
import { Sequelize } from 'sequelize-typescript';
import path from 'path';
import dotenv from 'dotenv';
import { Dialect } from 'sequelize';
const __dirname1 = path.resolve();
dotenv.config();

const database = process.env.NODE_ENV == 'production' ? process.env.DB_DATABASE : process.env.DB_DATABASE_TEST;
const isProduction = process.env.NODE_ENV === 'production';
let sequelize : Sequelize;
if (!isProduction) {
   sequelize = new Sequelize(`${database}`, "postgres", "admin", {
    host: process.env.NODE_ENV == 'production' ? process.env.DB_HOST : process.env.DB_HOST_TEST,
    dialect: "postgres",
    pool: {
      max: 9,
      min: 0,
      idle: 10000
    }
  });
} else {
  sequelize = new Sequelize(process.env.DB_URL, {
    dialect: "postgres"
  })
}
export default sequelize;
