const User = require('./user.model');

class UserRepository {
  async findByEmail(email, includePassword = false) {
    const query = User.findOne({ email });
    if (includePassword) {
      query.select('+password');
    }
    return await query.exec();
  }

  async findById(id) {
    return await User.findById(id).exec();
  }

  async create(userData) {
    const user = new User(userData);
    return await user.save();
  }

  async updateLastLogin(userId) {
    return await User.findByIdAndUpdate(userId, { lastLogin: new Date() }, { new: true }).exec();
  }
}

module.exports = new UserRepository();
