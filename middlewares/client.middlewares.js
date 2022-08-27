// Models
const { Client } = require('../models/clients.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { appError } = require('../utils/appError.util');

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

module.exports = { isClient };