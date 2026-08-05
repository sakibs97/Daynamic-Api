const path = require('path');
const winston = require('winston');
require('winston-daily-rotate-file');
const env = require('./env');

const logDir = path.resolve(__dirname, '../../logs');

// Daily Rotate File Transport for Application Logs
const dailyRotateAppTransport = new winston.transports.DailyRotateFile({
  filename: path.join(logDir, 'application-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
});

// Daily Rotate File Transport for Error Logs
const dailyRotateErrorTransport = new winston.transports.DailyRotateFile({
  level: 'error',
  filename: path.join(logDir, 'error-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '30d',
});

const logger = winston.createLogger({
  level: env.nodeEnv === 'development' ? 'debug' : 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  transports: [dailyRotateAppTransport, dailyRotateErrorTransport],
});

if (env.nodeEnv !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ timestamp, level, message, stack, requestId }) => {
          const reqIdStr = requestId ? ` [${requestId}]` : '';
          return `${timestamp}${reqIdStr} ${level}: ${stack || message}`;
        })
      ),
    })
  );
}

module.exports = logger;
