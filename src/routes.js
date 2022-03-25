import { Router } from 'express'

import helloController from './controllers/helloController'
import RequestsController from './controllers/RequestsController';
import UsersController from './controllers/UsersController';

const routes = new Router();

routes.get('/hello', helloController.index);

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

export default routes;