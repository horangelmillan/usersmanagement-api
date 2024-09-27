import jwt from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { config } from 'dotenv';

const { verify } = jwt;
config();

// Models
import { User } from '../models/users.model.js';

// Utils
import { catchAsync } from '../utils/catchAsync.util.js';
import { appError } from '../utils/appError.util.js';

// Create middlewares
const protectSession = catchAsync(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    };

    if (!token) {
        return next(new appError('invalid session', 401 /* unauthorized */))
    };

    const decrypt = verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({
                    status: 'fail',
                    message: 'Your session has expired! Please login again.',
                    expiredAt: err.expiredAt
                });
            }

            return res.status(401).json({
                status: 'fail',
                message: 'Token no válido.'
            });
        }

        return decoded;
    });

    const user = await User.findOne({
        where: {
            id: decrypt.id,
            status: 'active'
        }
    });

    if (!user) {
        return next(new appError(`The owner of this token doesnt exist anymore`, 410 /* gone / content deleted */))
    };

    req.user = user;
    next()
});

const comparePassword = catchAsync(async (req, res, next) => {
    const { password, user } = req.body;

    const validatedUser = await compare(password, user.password);

    if (!validatedUser) {
        return next(new appError('invalid credentials', 401));
    };

    next();
});

const protectUserAcounts = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { user } = req;

    if (id != user.id) {
        return next(new appError('This acount does not belong to you', 403 /* Forbiden / denied access */))
    };

    next();
});

export {
    protectSession,
    comparePassword,
    protectUserAcounts
};