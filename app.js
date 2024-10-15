import express, { json } from 'express';
import morgan from 'morgan';
import compression from 'compression';
import cors from 'cors';

// Routes
import { usersRouter } from './routes/user.routes.js';
import { clientsRouter } from './routes/client.routes.js';

// Controllers
import { globalErrorHandler } from './controllers/errors.controller.js';

// init express
const app = express();

// use middlewares
app.use(json());

app.use(cors());

app.use(morgan('dev'));
app.use(compression());

// main routes
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/clients', clientsRouter);

// Global error handdler
app.use(globalErrorHandler);

export { app };