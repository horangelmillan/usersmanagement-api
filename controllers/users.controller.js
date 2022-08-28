const jsw = require('jsonwebtoken');
require('dotenv').config();

// Models
const { User } = require('../models/users.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');

// create controllers
const createUser = catchAsync(async (req, res, next) => {
    const { username, email, password } = req.body;

    const userCreated = await User.create({
        username,
        email,
        password
    });

    userCreated.password = undefined;

    res.status(200).json({
        status: 'success',
        userCreated
    });
});

const login = catchAsync(async (req, res, next) => {
    const { id } = req.body.user;

    const token = jsw.sign({ id }, process.env.SECRET_KEY, {
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

module.exports = {
    createUser,
    login,
    updateUser,
    deleteUser,
    getUser
};