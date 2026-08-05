const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    issuer: { type: String, default: '' },
    issueDate: { type: String, default: '' },
    credentialUrl: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Certificate = mongoose.models.Certificate || mongoose.model('Certificate', certificateSchema);
module.exports = Certificate;
