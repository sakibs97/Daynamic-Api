const app = require('./app');
const env = require('./config/env');
const logger = require('./config/logger');
const { connectDatabase, disconnectDatabase } = require('./database/connection');

let server;

const startServer = async () => {
  await connectDatabase();

  server = app.listen(env.port, () => {
    logger.info(`Server bootstrapping complete. Running in [${env.nodeEnv}] mode on port ${env.port}`);
  });
};

const gracefulShutdown = async (signal) => {
  logger.info(`Received ${signal} signal. Initiating graceful shutdown...`);
  if (server) {
    server.close(async () => {
      logger.info('HTTP server closed.');
      await disconnectDatabase();
      process.exit(0);
    });
  } else {
    await disconnectDatabase();
    process.exit(0);
  }
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

process.on('unhandledRejection', (reason) => {
  logger.error(`Unhandled Promise Rejection: ${reason}`);
});

process.on('uncaughtException', (error) => {
  logger.error(`Uncaught Exception: ${error.message}`, { stack: error.stack });
  gracefulShutdown('uncaughtException');
});

startServer();
