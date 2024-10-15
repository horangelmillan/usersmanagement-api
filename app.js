import express, { json } from 'express';
import morgan from 'morgan';
import compression from 'compression';

// Routes
import { usersRouter } from './routes/user.routes.js';
import { clientsRouter } from './routes/client.routes.js';

// Controllers
import { globalErrorHandler } from './controllers/errors.controller.js';
import { header } from 'express-validator';

// init express
const app = express();

// use middlewares
app.use(json());

// Middleware para agregar el encabezado 'Access-Control-Allow-Origin'
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://usersmanagement-front-production.up.railway.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(morgan('dev'));
app.use(compression());

// Rutas principales
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/clients', clientsRouter);

// Global error handler
app.use(globalErrorHandler);

export { app };
