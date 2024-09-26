import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();
const { sign } = jwt;

// Models
import { User } from '../models/users.model.js';

// Utils
import { catchAsync } from '../utils/catchAsync.util.js';

// create controllers
const createUser = catchAsync(async (req, res, next) => {
    const { username, email, password } = req.body;

    const userCreated = await User.create({
        username,
        email,
        password
    });

    console.log(username, email, password);

    userCreated.password = undefined;

    res.status(200).json({
        status: 'success',
        userCreated
    });
});

const login = catchAsync(async (req, res, next) => {
    const { id } = req.body.user;

    const token = sign({ id }, process.env.SECRET_KEY, {
        expiresIn: '10m'
    });

    res.status(200).json({
        status: 'success',
        token
    });
});

const updateUser = catchAsync(async (req, res, next) => {
    const { id } = req.user;
    const { username, email, password } = req.body;

    await User.update({
        username,
        email,
        password
    }, {
        where: {
            id
        }
    });

    res.status(200).json({
        status: 'success'
    });
});

const deleteUser = catchAsync(async (req, res, next) => {
    const { id } = req.user;

    await User.update({
        status: 'disabled'
    }, {
        where: {
            id
        }
    });

    res.status(200).json({
        status: 'success'
    });
});

const getUser = catchAsync(async (req, res, next) => {
    const { user } = req;

    user.password = undefined;

    res.status(200).json({
        status: 'success',
        user
    });
});

export {
    createUser,
    login,
    updateUser,
    deleteUser,
    getUser
};