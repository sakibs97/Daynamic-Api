const authRepository = require('./auth.repository');
const { comparePassword, hashPassword } = require('./auth.password');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('./auth.jwt');
const { formatUserDTO } = require('./auth.dto');
const ApiError = require('../../common/exceptions/ApiError');

class AuthService {
  async login(email, password) {
    const user = await authRepository.findUserByEmail(email, true);
    if (!user) {
      throw new ApiError(401, 'Invalid email or password credentials', [], null, 'ERR_UNAUTHORIZED');
    }

    if (!user.isActive) {
      throw new ApiError(403, 'Account is deactivated', [], null, 'ERR_ACCOUNT_DISABLED');
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      throw new ApiError(401, 'Invalid email or password credentials', [], null, 'ERR_UNAUTHORIZED');
    }

    await authRepository.updateLastLogin(user._id);

    const tokenPayload = {
      sub: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    return {
      user: formatUserDTO(user),
      accessToken,
      refreshToken,
    };
  }

  async getMe(userId) {
    const user = await authRepository.findUserById(userId);
    if (!user) {
      throw new ApiError(404, 'User account not found', [], null, 'ERR_NOT_FOUND');
    }
    return formatUserDTO(user);
  }

  async updateProfile(userId, data) {
    const user = await authRepository.findUserById(userId);
    if (!user) throw new ApiError(404, 'User not found');
    if (data.name) user.name = data.name;
    if (data.email) user.email = data.email;
    if (data.avatar) user.avatar = data.avatar;
    await user.save();
    return formatUserDTO(user);
  }

  async changePassword(userId, currentPassword, newPassword) {
    const user = await authRepository.findUserById(userId, true);
    if (!user) throw new ApiError(404, 'User not found');
    const isMatch = await comparePassword(currentPassword, user.password);
    if (!isMatch) throw new ApiError(400, 'Current password incorrect');
    user.password = await hashPassword(newPassword);
    await user.save();
    return true;
  }

  async refreshTokens(refreshToken) {
    const payload = verifyRefreshToken(refreshToken);
    const user = await authRepository.findUserById(payload.sub);
    if (!user) throw new ApiError(401, 'User not found');
    const newPayload = { sub: user._id.toString(), email: user.email, role: user.role };
    return {
      accessToken: generateAccessToken(newPayload),
      refreshToken: generateRefreshToken(newPayload),
    };
  }
}

module.exports = new AuthService();
