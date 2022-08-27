const bcrypt = require('bcrypt');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');

const hashPassword = catchAsync(async (req, res, next) => {
    const { password } = req.body;

    if (password) {
        const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);

    req.body.password = hash;

    return next();
    };

    next();
});

module.exports = { hashPassword };