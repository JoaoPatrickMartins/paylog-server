import { Router } from 'express'

import helloController from './controllers/helloController'

const routes = new Router();

routes.get('/hello', helloController.index);

export default routes;