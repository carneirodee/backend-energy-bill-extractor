import express, { Router } from 'express';
import BillController from '../controllers/bill.controller'; 

const billRouter: Router = express.Router();
const controller = new BillController();

billRouter.get('/', controller.get);

billRouter.get('/:id', controller.getById);

billRouter.get('/:id/list', controller.getByClientCode);

billRouter.post('/', controller.post);

billRouter.put('/:id', controller.put);

billRouter.delete('/:id', controller.delete);

export default billRouter;