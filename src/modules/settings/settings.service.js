const settingsRepository = require('./settings.repository');

class SettingsService {
  async getSettings() {
    return await settingsRepository.getSettings();
  }

  async updateSettings(updateData) {
    return await settingsRepository.updateSettings(updateData);
  }
}

module.exports = new SettingsService();
