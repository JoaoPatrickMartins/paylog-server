import { Router } from 'express'

import auth from './middlewares/auth';

import SessionsController from './controllers/SessionsController';
import RequestsController from './controllers/RequestsController';
import UsersController from './controllers/UsersController';
import PurchaseRequestsController from './controllers/PurchaseRequestsController';

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
routes.get("/users/:user_id/purchaserequests/:company", PurchaseRequestsController.index);
routes.post("/users/:user_id/purchaserequests", PurchaseRequestsController.create);

export default routes;