const { z } = require('zod');

const createProjectSchema = z.object({
  title: z.string().min(1, 'Project title is required'),
  slug: z.string().optional(),
  shortDescription: z.string().optional(),
  description: z.string().min(1, 'Description is required'),
  thumbnail: z.string().optional(),
  gallery: z.array(z.string()).optional(),
  technologies: z.array(z.string()).optional(),
  category: z.enum(['Web', 'Mobile', 'Dashboard', 'UIUX', 'API', 'Other']).optional(),
  githubUrl: z.string().optional(),
  liveUrl: z.string().optional(),
  featured: z.boolean().optional(),
  order: z.number().optional(),
  status: z.enum(['Draft', 'Published']).optional(),
});

const updateProjectSchema = createProjectSchema.partial();

const toggleFeaturedSchema = z.object({
  featured: z.boolean({ required_error: 'Featured flag is required' }),
});

const updateStatusSchema = z.object({
  status: z.enum(['Draft', 'Published'], { required_error: 'Status must be Draft or Published' }),
});

module.exports = {
  createProjectSchema,
  updateProjectSchema,
  toggleFeaturedSchema,
  updateStatusSchema,
};
