const ApiError = require('../exceptions/ApiError');

const validateParams = (schema) => (req, res, next) => {
  try {
    req.params = schema.parse(req.params);
    next();
  } catch (error) {
    const formattedErrors = error.errors ? error.errors.map((err) => ({ field: err.path.join('.'), message: err.message })) : [error.message];
    next(new ApiError(400, 'Params Validation Error', formattedErrors, null, 'ERR_VALIDATION'));
  }
};

module.exports = validateParams;
