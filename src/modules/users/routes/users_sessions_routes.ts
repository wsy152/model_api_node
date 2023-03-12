import { Router } from 'express';

import { celebrate, Joi, Segments } from 'celebrate';
import UsersSessionsController from '../controllers/users_sessions_controller';

const usersSessionsRouter = Router();

const usersSessionsController = new UsersSessionsController();


usersSessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersSessionsController.create,
);

export default usersSessionsRouter;
