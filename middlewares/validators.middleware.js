import { body, validationResult } from 'express-validator';

// Utils
import { appError } from '../utils/appError.util.js';

const checkResult = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMsg = errors.array().map(err => err.msg);
        const msg = errorMsg.join(', ');

        return next(new appError(msg, 400));
    };

    next();
};

// user validators
const createUserValidators = [
    body('username').notEmpty().withMessage('name cannot be empty'),
    body('email').isEmail().withMessage('email must be a valid email'),
    body('password')
        .isAlphanumeric().withMessage('password must contain numbers and letters')
        .isLength({ min: 8 }).withMessage('password must have less than 8 digits'),
    checkResult
];

const loginValidators = [
    body('email').isEmail().withMessage('must provide a valid email'),
    body('password').isAlphanumeric().withMessage('password must content numbers and letters'),
    checkResult
];

// add client validators
const addClientsValidators = [
    body('DI')
        .isNumeric().withMessage('DI must be an number')
        .isLength({ max: 10, min: 7 }).withMessage('DI must contain less than 10 digits and more than 7 digits'),
    body('name').isString().withMessage('name cannot be empty'),
    body('lastname').isString().withMessage('lastname cannot be empty'),
    body('birthday').isISO8601({strict: true}).withMessage('date must be a valid date'),
    body('email').isEmail().withMessage('Email must be a valid email'),
    checkResult
];

export default {
    createUserValidators,
    loginValidators,
    addClientsValidators
};