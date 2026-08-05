const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema(
  {
    institution: { type: String, required: true },
    degree: { type: String, required: true },
    fieldOfStudy: { type: String, default: '' },
    period: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Education = mongoose.models.Education || mongoose.model('Education', educationSchema);
module.exports = Education;
