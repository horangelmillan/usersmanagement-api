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
const { protectSession } = require('../middlewares/auth.middleware');
const { isClient } = require('../middlewares/client.middlewares');
const {
    addClientsValidators,
} = require('../middlewares/validators.middleware');

// init router
const clientsRouter = express.Router();

clientsRouter.use(protectSession);

clientsRouter.post('/', addClientsValidators, createClient);
clientsRouter.patch('/:id', isClient, updateClient);

clientsRouter.get('/', getAllClients);
clientsRouter.get('/:id', getClient);

clientsRouter.delete('/:id', isClient, deleteClient);


module.exports = { clientsRouter };