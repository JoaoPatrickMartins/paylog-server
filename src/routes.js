import { Router } from 'express'

import auth from './middlewares/auth';

import SessionsController from './controllers/SessionsController';
import RequestsController from './controllers/RequestsController';
import UsersController from './controllers/UsersController';
import PurchaseRequestsController from './controllers/PurchaseRequestsController';
import DepositController from './controllers/DepositController';

const routes = new Router();

//Public Controller
routes.post('/sessions', SessionsController.create);

//Middlewares
routes.use(auth);

//Private Controller
 
//RESTFull
//Routes user
routes.get('/users', UsersController.index);
routes.get('/users/:id', UsersController.show);
routes.post('/users', UsersController.create);
routes.put('/users/:id', UsersController.update);
routes.put('/users/:id/updatepassword', UsersController.updatePassword);
routes.delete('/users/:id', UsersController.destroy);

//Routes request
routes.get("/users/:user_id/requests", RequestsController.index);
routes.get("/users/:user_id/requests/peding", RequestsController.showPending);
routes.get("/users/:user_id/requests/supervisor", RequestsController.showSupervisor);
routes.get("/users/:user_id/requests/:id", RequestsController.show);
routes.post("/users/:user_id/requests", RequestsController.create);
routes.delete("/users/:user_id/requests/:id", RequestsController.destroy);
routes.put("/users/:user_id/requests/:id", RequestsController.update);

//Routes purchase request
routes.get("/users/:user_id/:company/purchaserequests", PurchaseRequestsController.index);
routes.post("/users/:user_id/:company/purchaserequests", PurchaseRequestsController.create);

// Routes deposit
routes.get("/users/:user_id/deposit", DepositController.index);
routes.post("/users/:user_id/deposit", DepositController.create);
routes.put("/users/:user_id/deposit/:id", DepositController.update);
routes.delete("/users/:user_id/deposit/:id", DepositController.destroy);

export default routes;