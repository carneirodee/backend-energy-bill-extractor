import express, { Router } from 'express';
import BillConntroller from '../controllers/bill.controller'; 

const customerRouter: Router = express.Router();
const controller = new BillConntroller();

customerRouter.get('/', controller.get);

customerRouter.get('/:id', controller.getById);

customerRouter.get('/:id/list', controller.getByCustomerCode);

customerRouter.post('/', controller.post);

customerRouter.put('/:id', controller.put);

customerRouter.delete('/:id', controller.delete);

export default customerRouter;