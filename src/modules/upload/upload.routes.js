const express = require('express');
const { uploadImageHandler, uploadPdfHandler, deleteFileHandler } = require('./upload.controller');
const { uploadImage, uploadPdf } = require('./upload.middleware');
const { authenticate, authorizeRoles } = require('../auth');

const router = express.Router();

router.use(authenticate, authorizeRoles('ADMIN'));

router.post('/', uploadImage.single('file'), uploadImageHandler);
router.post('/image', uploadImage.single('file'), uploadImageHandler);
router.post('/pdf', uploadPdf.single('file'), uploadPdfHandler);
router.delete('/:publicId(*)', deleteFileHandler);

module.exports = router;
