const apiConfig = require('./api');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: apiConfig.title,
    version: apiConfig.apiVersion,
    description: apiConfig.description,
  },
  servers: [
    {
      url: apiConfig.apiPrefix,
      description: 'Development Server Environment',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Provide JWT token in Authorization header (Bearer <token>)',
      },
    },
  },
  tags: [
    { name: 'Health', description: 'System health check and diagnostic telemetry' },
    { name: 'Auth', description: 'Authentication & Session management endpoints (Placeholder)' },
    { name: 'Projects', description: 'Portfolio projects management endpoints (Placeholder)' },
    { name: 'Messages', description: 'Contact form messages endpoints (Placeholder)' },
  ],
};

const swaggerOptions = {
  swaggerDefinition,
  apis: ['./src/routes/*.js', './src/modules/**/*.routes.js', './src/modules/**/*.controller.js'],
};

module.exports = {
  swaggerDefinition,
  swaggerOptions,
};
