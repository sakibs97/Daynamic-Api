const ApiError = require('../common/exceptions/ApiError');

const notFoundHandler = (req, res, next) => {
  const error = new ApiError(404, `Route Not Found - ${req.originalUrl}`);
  next(error);
};

module.exports = notFoundHandler;
