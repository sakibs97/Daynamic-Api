const dns = require('dns');
try {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
} catch (e) {
  // Fallback if environment doesn't permit custom DNS servers
}

const mongoose = require('mongoose');
const env = require('../config/env');
const logger = require('../config/logger');
const User = require('../modules/user/user.model');
const { hashPassword } = require('../modules/auth/auth.password');

const seedAdminUser = async () => {
  try {
    const adminEmail = env.adminEmail;
    const adminPassword = env.adminPassword;
    const hashedPassword = await hashPassword(adminPassword);

    let adminUser = await User.findOne({ email: adminEmail });
    if (!adminUser) {
      adminUser = await User.create({
        name: 'Sakib Hossain',
        email: adminEmail,
        password: hashedPassword,
        role: 'ADMIN',
        isActive: true,
      });
      logger.info(`Admin user created: ${adminEmail}`);
    } else {
      adminUser.password = hashedPassword;
      await adminUser.save();
      logger.info(`Admin user credentials updated from ENV: ${adminEmail}`);
    }
  } catch (error) {
    logger.error(`Admin auto-seeding error: ${error.message}`);
  }
};

const connectDatabase = async () => {
  try {
    const connectionInstance = await mongoose.connect(env.mongoUri);
    logger.info(`MongoDB connected successfully! Host: ${connectionInstance.connection.host}`);
    await seedAdminUser();
  } catch (error) {
    logger.error(`MongoDB connection error: ${error.message}`);
  }
};

const disconnectDatabase = async () => {
  try {
    await mongoose.connection.close();
    logger.info('MongoDB connection closed successfully.');
  } catch (error) {
    logger.error(`MongoDB disconnection error: ${error.message}`);
  }
};

const getDatabaseStatus = () => {
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };
  const readyState = mongoose.connection.readyState;
  return {
    status: states[readyState] || 'unknown',
    readyState,
  };
};

module.exports = {
  connectDatabase,
  disconnectDatabase,
  getDatabaseStatus,
};
