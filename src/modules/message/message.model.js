const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, index: true },
    subject: { type: String, default: 'No Subject' },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    archived: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);
module.exports = Message;
