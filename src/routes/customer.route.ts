import express, { Router } from 'express';
import CustomerConntroller from '../controllers/customer.controller'; 

const customerRouter: Router = express.Router();
const controller = new CustomerConntroller();

customerRouter.get('/', controller.get);

customerRouter.get('/:id', controller.getById);

customerRouter.post('/', controller.post);

customerRouter.put('/:id', controller.put);

customerRouter.delete('/:id', controller.delete);

export default customerRouter;