import { Router } from 'express'

import auth from './middlewares/auth';

import SessionsController from './controllers/SessionsController';
import RequestsController from './controllers/RequestsController';
import UsersController from './controllers/UsersController';

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
routes.delete('/users/:id', UsersController.destroy);

//Routes request
routes.get("/users/:user_id/requests", RequestsController.index);
routes.post("/users/:user_id/requests", RequestsController.create);
routes.delete("/users/:user_id/requests/:id", RequestsController.destroy);
routes.put("/users/:user_id/requests/:id", RequestsController.update);

export default routes;