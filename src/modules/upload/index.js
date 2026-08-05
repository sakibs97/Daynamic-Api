const uploadRoutes = require('./upload.routes');
const uploadService = require('./upload.service');
const cloudinary = require('./cloudinary');

module.exports = {
  uploadRoutes,
  uploadService,
  cloudinary,
};
