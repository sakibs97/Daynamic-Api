const { v4: uuidv4 } = require('uuid');

const requestIdMiddleware = (req, res, next) => {
  const requestId = req.get('X-Request-ID') || uuidv4();
  req.requestId = requestId;
  res.setHeader('X-Request-ID', requestId);
  next();
};

module.exports = requestIdMiddleware;
