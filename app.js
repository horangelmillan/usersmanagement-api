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

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

app.use(morgan('dev'));
app.use(compression());

// main routes
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/clients', clientsRouter);

// Global error handdler
app.use(globalErrorHandler);

module.exports = { app };