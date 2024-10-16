import sequelize from './db';
import Customer from './models/customer.model';
import Bill from './models/bill.model';
import pg from 'pg';

const InitDB = async () => {
  const client = new pg.Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: 5432,
  });

  await client.connect();

  const res = await client.query(`SELECT datname FROM pg_catalog.pg_database WHERE datname = '${process.env.DB_DATABASE}'`);

  if (res.rowCount === 0) {
    console.log(`${process.env.DB_DATABASE} database not found, creating it.`);
    await client.query(`CREATE DATABASE "${process.env.DB_DATABASE}";`);
    console.log(`created database ${process.env.DB_DATABASE}.`);
  } else {
    console.log(`${process.env.DB_DATABASE} database already exists.`);
  }

  await client.end();

  sequelize.authenticate().then(() => {
    console.log("Success!");
  }).catch((err: any) => {
    console.log(err);
  });
  sequelize.addModels([Customer, Bill])
  Customer.sync();
  Bill.sync();
}

export default InitDB;
