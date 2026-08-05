const { verifyToken } = require('./auth.jwt');
const { ROLE_PERMISSIONS } = require('./auth.constants');
const ApiError = require('../../common/exceptions/ApiError');

const authenticate = (req, res, next) => {
  let token = null;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  } else if (req.cookies && req.cookies.accessToken) {
    token = req.cookies.accessToken;
  }

  if (!token) {
    return next(new ApiError(401, 'Authentication token missing', [], null, 'ERR_UNAUTHORIZED'));
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return next(new ApiError(401, 'Invalid or expired token', [], null, 'ERR_TOKEN_INVALID'));
  }

  req.user = decoded;
  next();
};

const currentUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    if (decoded) req.user = decoded;
  }
  next();
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, 'Authentication required', [], null, 'ERR_UNAUTHORIZED'));
    }

    if (!roles.includes(req.user.role)) {
      return next(new ApiError(403, 'Forbidden: Insufficient role permissions', [], null, 'ERR_FORBIDDEN'));
    }

    next();
  };
};

const authorizePermissions = (...permissions) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, 'Authentication required', [], null, 'ERR_UNAUTHORIZED'));
    }

    const userPermissions = ROLE_PERMISSIONS[req.user.role] || [];
    const hasPermission = permissions.every((p) => userPermissions.includes(p));

    if (!hasPermission) {
      return next(new ApiError(403, 'Forbidden: Missing required action permission', [], null, 'ERR_FORBIDDEN'));
    }

    next();
  };
};

module.exports = {
  authenticate,
  currentUser,
  authorizeRoles,
  authorizePermissions,
};
