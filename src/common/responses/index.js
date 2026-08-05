const sendSuccess = (res, statusCode, message, data = null, meta = null) => {
  return res.status(statusCode).json({
    success: true,
    message,
    ...(data !== null && { data }),
    ...(meta !== null && { meta }),
  });
};

const sendError = (res, statusCode, message, errors = [], requestId = null, errorCode = 'ERR_INTERNAL') => {
  return res.status(statusCode).json({
    success: false,
    errorCode,
    message,
    errors,
    ...(requestId && { requestId }),
  });
};

module.exports = {
  sendSuccess,
  sendError,
};
