import sequelize from './db';
import Client from './models/client.model';
import Bill from './models/bill.model';
import { extractorDataPdf } from './services/extractor-pdf';
import pg from 'pg';
import { deleteDuplicates } from './utils/deleteDuplicates';
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
    }
    else {
        console.log(`${process.env.DB_DATABASE} database already exists.`);
    }
    await client.end();
    sequelize.authenticate().then(() => {
        console.log("Success!");
    }).catch((err) => {
        console.log(err);
    });
    sequelize.addModels([Client, Bill]);
    await Client.sync();
    await Bill.sync();
    extractorDataPdf();
    setInterval(() => {
        deleteDuplicates();
    }, 6000);
};
export default InitDB;
