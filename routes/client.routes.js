const express = require('express');

// Controllers
const {
    createClient,
    updateClient,
    deleteClient,
    getAllClients,
    getClient
} = require('../controllers/clients.controllers');

// Middlewares
const { protectSession, protectUserAcounts } = require('../middlewares/auth.middleware');
const { isClient } = require('../middlewares/client.middlewares');
const {
    addClientsValidators,
} = require('../middlewares/validators.middleware');

// init router
const clientsRouter = express.Router();

clientsRouter.use(protectSession);

clientsRouter.post('/', addClientsValidators, createClient);
clientsRouter.put('/:id', isClient, updateClient);

clientsRouter.get('/', getAllClients);

clientsRouter.use('/:id', isClient, protectUserAcounts)
    .route('/:id')
    .get(getClient)
    .delete(deleteClient);

module.exports = { clientsRouter };