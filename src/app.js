const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const apiConfig = require('./config/api');
const helmetConfig = require('./config/helmet');
const corsConfig = require('./config/cors');
const { swaggerOptions } = require('./config/swagger');

const requestIdMiddleware = require('./middlewares/requestId');
const requestLoggerMiddleware = require('./middlewares/requestLogger');
const globalRateLimiter = require('./middlewares/rateLimiter');
const notFoundHandler = require('./middlewares/notFound');
const globalErrorHandler = require('./middlewares/errorHandler');

const routes = require('./routes');

const app = express();

// Core Middlewares
app.use(requestIdMiddleware);
app.use(requestLoggerMiddleware);
app.use(helmet(helmetConfig));
app.use(cors(corsConfig));
app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(globalRateLimiter);

// Swagger Specification & UI Documentation
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Mount Primary API Router
app.use(apiConfig.apiPrefix, routes);

// 404 & Global Error Handling
app.use(notFoundHandler);
app.use(globalErrorHandler);

module.exports = app;
