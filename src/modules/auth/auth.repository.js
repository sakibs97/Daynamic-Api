const userRepository = require('../user/user.repository');

class AuthRepository {
  async findUserByEmail(email, includePassword = true) {
    return await userRepository.findByEmail(email, includePassword);
  }

  async findUserById(id) {
    return await userRepository.findById(id);
  }

  async updateLastLogin(userId) {
    return await userRepository.updateLastLogin(userId);
  }
}

module.exports = new AuthRepository();
