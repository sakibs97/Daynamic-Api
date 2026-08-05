const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const requiredEnvVars = ['PORT', 'NODE_ENV', 'MONGODB_URI', 'JWT_SECRET', 'CLIENT_URL', 'ADMIN_URL'];

requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    if (key === 'PORT') process.env.PORT = '5000';
    if (key === 'NODE_ENV') process.env.NODE_ENV = 'development';
    if (key === 'MONGODB_URI') process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/portfolio';
    if (key === 'JWT_SECRET') process.env.JWT_SECRET = 'default_jwt_secret';
    if (key === 'CLIENT_URL') process.env.CLIENT_URL = 'http://localhost:3000';
    if (key === 'ADMIN_URL') process.env.ADMIN_URL = 'http://localhost:3001';
  }
});

module.exports = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  clientUrl: process.env.CLIENT_URL,
  adminUrl: process.env.ADMIN_URL,
  adminEmail: process.env.ADMIN_EMAIL || 'admin@example.com',
  adminPassword: process.env.ADMIN_PASSWORD || 'AdminPass123!',
};
