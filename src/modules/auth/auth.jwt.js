const jwt = require('jsonwebtoken');
const env = require('../../config/env');

const generateAccessToken = (payload) => {
  return jwt.sign(payload, env.jwtSecret, { expiresIn: '15m' });
};

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, env.jwtSecret, { expiresIn: '7d' });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, env.jwtSecret);
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
};
