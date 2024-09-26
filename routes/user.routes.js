import { Router } from 'express';

// Controllers
import { createUser, login, updateUser, deleteUser, getUser } from '../controllers/users.controller.js';

// Middlewares
import { createUserValidators, loginValidators } from '../middlewares/validators.middleware.js';
import { hashPassword } from '../middlewares/security.middleware.js';
import { isEmail } from '../middlewares/user.middleware.js';
import { comparePassword, protectSession, protectUserAcounts } from '../middlewares/auth.middleware.js';

// init router
const usersRouter = Router();

// child routes
usersRouter.post('/signup', createUserValidators, hashPassword, createUser);
usersRouter.post('/login', loginValidators, isEmail, comparePassword, login);

usersRouter.use(protectSession);

usersRouter.get('/', getUser);

usersRouter.use('/:id', protectUserAcounts)
    .route('/:id')
    .patch(hashPassword, updateUser)
    .delete(deleteUser);

export default { usersRouter };