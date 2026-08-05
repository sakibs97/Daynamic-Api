const ApiError = require('../exceptions/ApiError');

const validateQuery = (schema) => (req, res, next) => {
  try {
    req.query = schema.parse(req.query);
    next();
  } catch (error) {
    const formattedErrors = error.errors ? error.errors.map((err) => ({ field: err.path.join('.'), message: err.message })) : [error.message];
    next(new ApiError(400, 'Query Validation Error', formattedErrors, null, 'ERR_VALIDATION'));
  }
};

module.exports = validateQuery;
