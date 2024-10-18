import express from 'express';
import swaggerUi from 'swagger-ui-express';
import InitDB from './connection';
import clientRouter from './routes/client.route';
import billRouter from './routes/bill.route';
import dotenv from 'dotenv'
import path from 'path';
import fs from 'fs';
dotenv.config()

const __dirname1 = path.resolve();

const app = express();


const isTest = process.env.NODE_ENV === 'test';

app.use(express.json());

if (!isTest) {
    const loadJSON = (path : any) => JSON.parse(fs.readFileSync(new URL(path, __dirname1)).toString());
    
    const swaggerDocs = loadJSON('../swagger.json');
    app.use('/api-v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
      }

app.use((req,res,next) =>{
    let time = new Date(Date.now()).toString();
    console.log(req.method,req.hostname, req.path, time);
    next();
});
app.use('/api-v1/bills', billRouter);
app.use("/api-v1/clients", clientRouter);

async function Initialization(): Promise<void> {
    try {
        await InitDB()
    } catch (e) {
        console.log(e)
    }
}

Initialization()

export default app;