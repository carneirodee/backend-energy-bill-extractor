import express, { Router } from 'express';
import ClientController from '../controllers/client.controller'; 

const clientRouter: Router = express.Router();
const controller = new ClientController();

clientRouter.get('/', controller.get);

clientRouter.get('/:id', controller.getById);

clientRouter.post('/', controller.post);

clientRouter.put('/:id', controller.put);

clientRouter.delete('/:id', controller.delete);

export default clientRouter;