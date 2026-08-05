const { z } = require('zod');

const deleteFileSchema = z.object({
  publicId: z.string().min(1, 'Public ID is required'),
});

module.exports = {
  deleteFileSchema,
};
