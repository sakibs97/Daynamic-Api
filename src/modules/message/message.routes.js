const express = require('express');
const { createMessage, getMessages, markAsRead, deleteMessage } = require('./message.controller');
const { authenticate, authorizeRoles } = require('../auth');

const router = express.Router();

// Public: Send Message
router.post('/', createMessage);

// Protected: Admin Inbox Management
router.get('/', authenticate, authorizeRoles('ADMIN'), getMessages);
router.patch('/:id/read', authenticate, authorizeRoles('ADMIN'), markAsRead);
router.delete('/:id', authenticate, authorizeRoles('ADMIN'), deleteMessage);

module.exports = router;
