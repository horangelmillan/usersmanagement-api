import { Router } from 'express';

// Controllers
import { createClient, updateClient, deleteClient, getAllClients, getClient } from '../controllers/clients.controllers';

// Middlewares
import { protectSession } from '../middlewares/auth.middleware';
import { isClient } from '../middlewares/client.middlewares';
import { addClientsValidators } from '../middlewares/validators.middleware';

// init router
const clientsRouter = Router();

clientsRouter.use(protectSession);

clientsRouter.post('/', addClientsValidators, createClient);
clientsRouter.patch('/:id', isClient, updateClient);

clientsRouter.get('/', getAllClients);
clientsRouter.get('/:id', getClient);

clientsRouter.delete('/:id', isClient, deleteClient);


export default { clientsRouter };