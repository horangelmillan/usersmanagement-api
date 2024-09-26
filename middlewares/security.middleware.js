import { genSalt, hash as _hash } from 'bcrypt';

// Utils
import { catchAsync } from '../utils/catchAsync.util.js';

const hashPassword = catchAsync(async (req, res, next) => {
    const { password } = req.body;

    if (password) {
        const salt = await genSalt(12);
    const hash = await _hash(password, salt);

    req.body.password = hash;

    return next();
    };

    next();
});

export { hashPassword };