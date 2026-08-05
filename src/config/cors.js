const env = require('./env');

const allowedOrigins = [env.clientUrl, env.adminUrl].filter(Boolean);

module.exports = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || env.nodeEnv === 'development') {
      callback(null, true);
    } else {
      callback(new Error('CORS policy violation: Origin not allowed'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-ID'],
};
