import productsRouter from '@modules/products/routes/products.routes';
import usersRouter from '@modules/users/routes/users_routes';
import usersSessionsRouter from '@modules/users/routes/users_sessions_routes';
import { Router } from 'express';

const routes = Router();

routes.use('/products', productsRouter);

routes.use('/users',usersRouter);

routes.use('/sessions',usersSessionsRouter);


export default routes;
