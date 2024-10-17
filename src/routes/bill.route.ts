import express, { Router } from 'express';
import BillConntroller from '../controllers/bill.controller'; 

const billRouter: Router = express.Router();
const controller = new BillConntroller();

billRouter.get('/', controller.get);

billRouter.get('/:id', controller.getById);

billRouter.get('/:id/list', controller.getByCustomerCode);

billRouter.post('/', controller.post);

billRouter.put('/:id', controller.put);

billRouter.delete('/:id', controller.delete);

export default billRouter;