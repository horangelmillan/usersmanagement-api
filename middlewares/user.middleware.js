// Models
import { User } from '../models/users.model.js';

// Utils
import { catchAsync } from '../utils/catchAsync.util.js';
import { appError } from '../utils/appError.util.js';

const isEmail = catchAsync(async (req, res, next) => {
    const { email } = req.body;

    const user = await User.findOne({
        where: {
            email,
            status: 'active'
        }
    });

    if (!user) {
        return next(new appError('This user is not exist anymore', 410));
    };

    req.body.user = user;
    next();
});

export { isEmail };