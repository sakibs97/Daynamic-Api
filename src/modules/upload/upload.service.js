const cloudinary = require('./cloudinary');
const ApiError = require('../../common/exceptions/ApiError');

class UploadService {
  async uploadFileStream(fileBuffer, folder = 'portfolio/projects', resourceType = 'auto') {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: resourceType,
        },
        (error, result) => {
          if (error) {
            return reject(new ApiError(500, `Cloudinary upload failed: ${error.message}`, [], null, 'ERR_UPLOAD_FAILED'));
          }
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
          });
        }
      );
      uploadStream.end(fileBuffer);
    });
  }

  async deleteFile(publicId) {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      return result;
    } catch (error) {
      throw new ApiError(500, `Cloudinary delete failed: ${error.message}`, [], null, 'ERR_DELETE_FAILED');
    }
  }
}

module.exports = new UploadService();
