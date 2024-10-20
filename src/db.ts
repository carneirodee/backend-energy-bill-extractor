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
    host: "energy_measure_owner:pb8PNSe5mwcx@ep-frosty-rice-a565pfm1.us-east-2.aws.neon.tech",
    dialect: "postgres",
    pool: {
      max: 9,
      min: 0,
      idle: 10000
    }
  });
} else {
  sequelize = new Sequelize(`${database}`, "postgres", "admin", {
    host: "energy_measure_owner:pb8PNSe5mwcx@ep-frosty-rice-a565pfm1.us-east-2.aws.neon.tech",
    dialect: "postgres",
    pool: {
      max: 9,
      min: 0,
      idle: 10000
    },
    ssl: true
})
}
export default sequelize;
