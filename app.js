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

const corsOptions = {
  origin: ['https://usersmanagement-front-production.up.railway.app'],
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
};

app.use(cors(corsOptions));

app.use(morgan('dev'));
app.use(compression());

// Rutas principales
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/clients', clientsRouter);

// Global error handler
app.use(globalErrorHandler);

export { app };
