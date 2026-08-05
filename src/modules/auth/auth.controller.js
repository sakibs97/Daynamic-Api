const authService = require('./auth.service');
const asyncHandler = require('../../utils/asyncHandler');
const { sendSuccess } = require('../../common/responses');

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { user, accessToken, refreshToken } = await authService.login(email, password);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return sendSuccess(res, 200, 'Login successful', { user, token: accessToken, accessToken, refreshToken });
});

const logout = asyncHandler(async (req, res) => {
  res.clearCookie('refreshToken');
  return sendSuccess(res, 200, 'Logout successful');
});

const getMe = asyncHandler(async (req, res) => {
  const userId = req.user.sub || req.user.id;
  const user = await authService.getMe(userId);
  return sendSuccess(res, 200, 'User profile retrieved', { user });
});

const updateProfile = asyncHandler(async (req, res) => {
  const userId = req.user.sub || req.user.id;
  const user = await authService.updateProfile(userId, req.body);
  return sendSuccess(res, 200, 'Profile updated successfully', { user });
});

const changePassword = asyncHandler(async (req, res) => {
  const userId = req.user.sub || req.user.id;
  const { currentPassword, newPassword } = req.body;
  await authService.changePassword(userId, currentPassword, newPassword);
  return sendSuccess(res, 200, 'Password changed successfully');
});

const refreshToken = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken || req.body?.refreshToken;
  if (!token) return res.status(401).json({ success: false, message: 'Refresh token required' });
  const tokens = await authService.refreshTokens(token);
  return sendSuccess(res, 200, 'Token refreshed', tokens);
});

module.exports = {
  login,
  logout,
  getMe,
  updateProfile,
  changePassword,
  refreshToken,
};
