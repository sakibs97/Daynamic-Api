const { z } = require('zod');

const updateSettingsSchema = z.object({
  personal: z
    .object({
      name: z.string().optional(),
      designation: z.string().optional(),
      bio: z.string().optional(),
      profileImage: z.string().optional(),
      resumeUrl: z.string().optional(),
    })
    .optional(),
  social: z
    .object({
      github: z.string().optional(),
      linkedin: z.string().optional(),
      facebook: z.string().optional(),
      twitter: z.string().optional(),
      youtube: z.string().optional(),
    })
    .optional(),
  contact: z
    .object({
      email: z.string().email('Invalid email address').optional(),
      phone: z.string().optional(),
      location: z.string().optional(),
    })
    .optional(),
  hero: z
    .object({
      title: z.string().optional(),
      subtitle: z.string().optional(),
      buttonText: z.string().optional(),
    })
    .optional(),
  about: z
    .object({
      description: z.string().optional(),
    })
    .optional(),
  seo: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      keywords: z.array(z.string()).optional(),
    })
    .optional(),
});

module.exports = {
  updateSettingsSchema,
};
