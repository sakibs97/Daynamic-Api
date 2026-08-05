class ApiError extends Error {
  constructor(statusCode, message, errors = [], stack = '', errorCode = 'ERR_API_ERROR') {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
    this.errorCode = errorCode;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = ApiError;
