const express = require('express');

// Controllers
const {
    createUser,
    login,
    updateUser,
    deleteUser,
    getUser
} = require('../controllers/users.controller');

// Middlewares
const {
    createUserValidators,
    loginValidators
} = require('../middlewares/validators.middleware');
const { hashPassword } = require('../middlewares/security.middleware');
const { isEmail } = require('../middlewares/user.middleware');
const {
    comparePassword,
    protectSession,
    protectUserAcounts
} = require('../middlewares/auth.middleware');

// init router
const usersRouter = express.Router();

// child routes
usersRouter.post('/signup', createUserValidators, hashPassword, createUser);
usersRouter.post('/login', loginValidators, isEmail, comparePassword, login);

usersRouter.use(protectSession);

usersRouter.get('/', getUser);

usersRouter.use('/:id', protectUserAcounts)
    .route('/:id')
    .patch(hashPassword, updateUser)
    .delete(deleteUser);

module.exports = { usersRouter };