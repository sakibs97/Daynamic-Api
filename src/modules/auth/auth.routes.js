const express = require('express');
const { login, logout, getMe, updateProfile, changePassword, refreshToken } = require('./auth.controller');
const { authenticate } = require('./auth.middleware');
const { validateBody } = require('../../common/validation');
const { loginSchema } = require('./auth.validator');

const router = express.Router();

router.post('/login', validateBody(loginSchema), login);
router.post('/logout', logout);
router.post('/refresh', refreshToken);
router.get('/me', authenticate, getMe);
router.get('/profile', authenticate, getMe);
router.put('/profile', authenticate, updateProfile);
router.put('/change-password', authenticate, changePassword);

module.exports = router;
