const asyncHandler = require('../../utils/asyncHandler');
const { sendSuccess } = require('../../common/responses');
const { getDatabaseStatus } = require('../../database/connection');
const env = require('../../config/env');
const apiConfig = require('../../config/api');

/**
 * @openapi
 * /health:
 *   get:
 *     tags:
 *       - Health
 *     summary: System Health & Telemetry Check
 *     description: Returns detailed operational status including uptime, memory usage, CPU metrics, Node version, environment, and database state.
 *     responses:
 *       200:
 *         description: API is healthy.
 */
const getHealthStatus = asyncHandler(async (req, res) => {
  const memoryUsage = process.memoryUsage();
  const cpuUsage = process.cpuUsage();

  const healthData = {
    version: apiConfig.apiVersion,
    environment: env.nodeEnv,
    uptime: process.uptime(),
    database: getDatabaseStatus(),
    memory: {
      rss: `${Math.round(memoryUsage.rss / 1024 / 1024)} MB`,
      heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)} MB`,
      heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`,
    },
    cpu: {
      user: cpuUsage.user,
      system: cpuUsage.system,
    },
    nodeVersion: process.version,
  };

  return sendSuccess(res, 200, 'API is healthy', healthData);
});

module.exports = {
  getHealthStatus,
};
