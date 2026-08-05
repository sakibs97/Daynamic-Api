const uploadService = require('./upload.service');
const asyncHandler = require('../../utils/asyncHandler');
const { sendSuccess } = require('../../common/responses');
const ApiError = require('../../common/exceptions/ApiError');

/**
 * @openapi
 * /upload/image:
 *   post:
 *     tags:
 *       - Upload
 *     summary: Upload Image to Cloudinary
 *     description: Uploads single image file (jpg, jpeg, png, webp, svg) up to 5MB (Admin Only).
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               folder:
 *                 type: string
 *                 example: portfolio/projects
 *     responses:
 *       200:
 *         description: Image uploaded successfully.
 *       400:
 *         description: Missing file or invalid file type.
 */
const uploadImageHandler = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, 'Image file is required', [], null, 'ERR_MISSING_FILE');
  }

  const folder = req.body.folder || 'portfolio/projects';
  const result = await uploadService.uploadFileStream(req.file.buffer, folder, 'image');

  return sendSuccess(res, 200, 'Image uploaded successfully', result);
});

/**
 * @openapi
 * /upload/pdf:
 *   post:
 *     tags:
 *       - Upload
 *     summary: Upload PDF Document to Cloudinary
 *     description: Uploads single PDF document file up to 5MB (Admin Only).
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               folder:
 *                 type: string
 *                 example: portfolio/resume
 *     responses:
 *       200:
 *         description: PDF uploaded successfully.
 *       400:
 *         description: Missing file or invalid document format.
 */
const uploadPdfHandler = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, 'PDF document file is required', [], null, 'ERR_MISSING_FILE');
  }

  const folder = req.body.folder || 'portfolio/resume';
  const result = await uploadService.uploadFileStream(req.file.buffer, folder, 'raw');

  return sendSuccess(res, 200, 'PDF document uploaded successfully', result);
});

/**
 * @openapi
 * /upload/{publicId}:
 *   delete:
 *     tags:
 *       - Upload
 *     summary: Delete File Asset from Cloudinary
 *     description: Removes uploaded asset by publicId (Admin Only).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: publicId
 *         required: true
 *         schema:
 *           type: string
 *         description: Cloudinary public_id of the file to remove
 *     responses:
 *       200:
 *         description: File deleted successfully.
 */
const deleteFileHandler = asyncHandler(async (req, res) => {
  const { publicId } = req.params;
  const result = await uploadService.deleteFile(publicId);

  return sendSuccess(res, 200, 'File asset deleted successfully', result);
});

module.exports = {
  uploadImageHandler,
  uploadPdfHandler,
  deleteFileHandler,
};
