const morgan = require('morgan');
const logger = require('../config/logger');

const stream = {
  write: (message) => logger.info(message.trim()),
};

const requestLoggerMiddleware = morgan(
  ':remote-addr ":method :url HTTP/:http-version" :status :res[content-length] - :response-time ms',
  { stream }
);

module.exports = requestLoggerMiddleware;
