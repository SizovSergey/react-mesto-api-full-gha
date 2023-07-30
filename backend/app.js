const express = require('express');

const helmet = require('helmet');

const rateLimit = require('express-rate-limit');

const app = express();

const mongoose = require('mongoose');

const { errors } = require('celebrate');

const routes = require('./routes/index');

const errorsHandler = require('./middlewares/errorsHandler');

const allowedCors = require('./middlewares/cors');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const apiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(express.json());

app.use(helmet());

app.use((req, res, next) => {
  const { origin } = req.headers;
  const requestHeaders = req.headers['access-control-request-headers'];
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  next();
});

app.use('/api', apiLimiter);

app.use(routes);

app.use(errors());

app.use(errorsHandler);

app.listen(PORT);
