const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema(
  {
    company: { type: String, required: true },
    position: { type: String, required: true },
    period: { type: String, default: '' },
    description: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Experience = mongoose.models.Experience || mongoose.model('Experience', experienceSchema);
module.exports = Experience;
