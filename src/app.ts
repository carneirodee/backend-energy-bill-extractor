import express from 'express';
import swaggerUi from 'swagger-ui-express';
import InitDB from './connection';
import dotenv from 'dotenv'
import path from 'path';
import fs from 'fs';
dotenv.config()

const __dirname1 = path.resolve();

const app = express();

const loadJSON = (path : any) => JSON.parse(fs.readFileSync(new URL(path, import.meta.url)).toString());

const swaggerDocs = loadJSON('../swagger.json');

app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
// app.use('/measures', measureRouter)

async function Initialization(): Promise<void> {
    try {
        await InitDB()
    } catch (e) {
        console.log(e)
    }
}

Initialization();


app.get("/", (request: any, response: any) => {
    response.status(200).send({ message: "success" });
});

export default app;