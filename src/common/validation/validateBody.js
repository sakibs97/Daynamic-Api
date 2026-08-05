const ApiError = require('../exceptions/ApiError');

const validateBody = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    const formattedErrors = error.errors ? error.errors.map((err) => ({ field: err.path.join('.'), message: err.message })) : [error.message];
    next(new ApiError(400, 'Validation Error', formattedErrors, null, 'ERR_VALIDATION'));
  }
};

module.exports = validateBody;
