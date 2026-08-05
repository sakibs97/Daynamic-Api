const Message = require('./message.model');

const createMessage = async (req, res, next) => {
  try {
    const { email, subject, message } = req.body;
    if (!email || !message) {
      return res.status(400).json({ success: false, message: 'Email and message are required' });
    }
    const newMessage = await Message.create({ email, subject, message });
    return res.status(201).json({ success: true, data: newMessage });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: messages });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const markAsRead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await Message.findByIdAndUpdate(id, { read: true }, { new: true });
    return res.status(200).json({ success: true, data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Message.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: 'Message deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createMessage,
  getMessages,
  markAsRead,
  deleteMessage,
};
