const authRoutes = require('./auth.routes');
const authService = require('./auth.service');
const authRepository = require('./auth.repository');
const authMiddleware = require('./auth.middleware');
const authConstants = require('./auth.constants');

module.exports = {
  authRoutes,
  authService,
  authRepository,
  ...authMiddleware,
  ...authConstants,
};
