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
  credentials: true,
  origin: ['https://usersmanagement-front.herokuapp.com/'],
  "Access-Control-Allow-Origin": '*',
  "Access-Control-Allow-Credentials": true,
  'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE, PATCH, OPTIONS',
  "Access-Control-Allow-Headers": 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json'
};

var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

app.use(allowCrossDomain);

app.use(cors(corsOptions));

app.use(morgan('dev'));
app.use(compression());

// main routes
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/clients', clientsRouter);

// Global error handdler
app.use(globalErrorHandler);

export default { app };