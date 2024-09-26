// Models
import { Client } from '../models/clients.model.js';

// Utils
import { catchAsync } from '../utils/catchAsync.util.js';
import { appError } from '../utils/appError.util.js';

const isClient = catchAsync(async (req, res, next) => {
    const { id, clientId } = req.body;
    const paramsId = req.params.id;

    const dinamycId = id || clientId || paramsId;

    const client = Client.findOne({
        where: {
            id: dinamycId
        }
    });

    if (!client) {
        return next(new appError('client not found', 404));
    };

    req.body.client = client;
    next()
});

export default { isClient };