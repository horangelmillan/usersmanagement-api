// Models
const { Client } = require('../models/clients.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');

// Create controllers
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
        adressTwo
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
        adressTwo
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
    const { client } = req.body;

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

module.exports = {
    createClient,
    updateClient,
    getAllClients,
    getClient,
    deleteClient
};