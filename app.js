const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const cors = require('cors');

// Routes
const { usersRouter } = require('./routes/user.routes');
const { clientsRouter } = require('./routes/client.routes');

// Controllers
const { globalErrorHandler } = require('./controllers/errors.controller');

// init express
const app = express();

// use middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(compression());

// main routes
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/clients', clientsRouter);

// Global error handdler
app.use(globalErrorHandler);

module.exports = { app };