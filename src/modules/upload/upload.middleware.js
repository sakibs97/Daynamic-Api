const multer = require('multer');
const ApiError = require('../../common/exceptions/ApiError');

const storage = multer.memoryStorage();

const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

const imageFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new ApiError(400, 'Invalid image type. Allowed: jpg, jpeg, png, webp, svg', [], null, 'ERR_INVALID_FILE_TYPE'), false);
  }
};

const pdfFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new ApiError(400, 'Invalid document type. Only PDF files are allowed', [], null, 'ERR_INVALID_FILE_TYPE'), false);
  }
};

const uploadImage = multer({
  storage,
  limits: { fileSize: MAX_SIZE },
  fileFilter: imageFilter,
});

const uploadPdf = multer({
  storage,
  limits: { fileSize: MAX_SIZE },
  fileFilter: pdfFilter,
});

module.exports = {
  uploadImage,
  uploadPdf,
};
