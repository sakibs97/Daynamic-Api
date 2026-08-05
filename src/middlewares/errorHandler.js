const env = require('../config/env');
const logger = require('../config/logger');
const { sendError } = require('../common/responses');

const globalErrorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let errors = err.errors || [];
  let errorCode = err.errorCode || 'ERR_INTERNAL';

  logger.error(`[${req.requestId || 'N/A'}] ${statusCode} - ${message} - ${req.originalUrl} - ${req.method}`, {
    stack: err.stack,
  });

  return sendError(res, statusCode, message, errors, req.requestId, errorCode);
};

module.exports = globalErrorHandler;
