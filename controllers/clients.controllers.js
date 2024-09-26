// Models
import { Client } from '../models/clients.model.js';

// Utils
import { catchAsync } from '../utils/catchAsync.util.js';

// Create controller
const createClient = catchAsync(async (req, res, next) => {
    const {
        DI,
        name,
        lastname,
        birthday,
        email,
        phonenumberOne,
        phonenumberTwo,
        addressOne,
        addressTwo
    } = req.body;

    const { user } = req;

    const clientCreated = await Client.create({
        userId: user.id,
        DI,
        name,
        lastname,
        birthday,
        email,
        phonenumberOne,
        phonenumberTwo,
        addressOne,
        addressTwo
    });

    res.status(200).json({
        status: 'success',
        clientCreated
    });
});

const getAllClients = catchAsync(async (req, res, next) => {
    const { user } = req;

    const clients = await Client.findAll({
        where: {
            userId: user.id,
            status: 'active'
        }
    });

    res.status(200).json({
        status: 'success',
        clients
    });
});

const getClient = catchAsync(async (req, res, next) => {
    const { user } = req;
    const { id } = req.params;

    const client = await Client.findOne({
        where: {
            id,
            userId: user.id,
            status: 'active'
        }
    });

    res.status(200).json({
        status: 'success',
        client
    });
});

const deleteClient = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    await Client.update({
        status: 'deleted'
    }, {
        where: {
            id
        }
    });

    res.status(200).json({
        status: 'success',
    });
});

const updateClient = catchAsync(async (req, res, next) => {
    const {
        email,
        name,
        phonenumberOne,
        phonenumberTwo,
        addressOne,
        addressTwo
    } = req.body;

    const { id } = req.params;

    await Client.update({
        email,
        name,
        phonenumberOne,
        phonenumberTwo,
        addressOne,
        addressTwo
    }, {
        where: {
            id,
            status: 'active'
        }
    });

    res.status(200).json({
        status: 'success',
    })
});

export {
    createClient,
    updateClient,
    getAllClients,
    getClient,
    deleteClient
};