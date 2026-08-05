const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    shortDescription: {
      type: String,
      default: '',
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
    },
    thumbnail: {
      type: String,
      default: '',
    },
    gallery: {
      type: [String],
      default: [],
    },
    technologies: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      enum: ['Web', 'Mobile', 'Dashboard', 'UIUX', 'API', 'Other'],
      default: 'Web',
    },
    githubUrl: {
      type: String,
      default: '',
    },
    liveUrl: {
      type: String,
      default: '',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['Draft', 'Published'],
      default: 'Published',
    },
  },
  {
    timestamps: true,
  }
);

// Slugify helper
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

projectSchema.pre('validate', function (next) {
  if (this.title && !this.slug) {
    this.slug = slugify(this.title);
  }
  next();
});

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

module.exports = Project;
