const Settings = require('./settings.model');

const defaultSettings = {
  personal: {
    name: 'Sakib Hossain',
    designation: 'Full Stack Web Developer',
    bio: 'Passionate software engineer building web applications.',
    profileImage: '',
    resumeUrl: '',
  },
  social: {
    github: 'https://github.com/sakibs97',
    linkedin: 'https://www.linkedin.com/in/sakibs97/',
    facebook: 'https://www.facebook.com/sakibs978/',
    twitter: '',
    youtube: '',
  },
  contact: {
    email: 'contact@example.com',
    phone: '+8801751051197',
    location: 'Dhaka, Bangladesh',
  },
  hero: {
    title: "Hello, I'm Sakib",
    subtitle: 'Full Stack Developer & UI/UX Designer',
    buttonText: 'Hire Me',
  },
  about: {
    description: 'I am a full-stack developer with experience in React, Next.js, Node.js, Express, and MongoDB.',
  },
  seo: {
    title: 'Sakib Hossain - Portfolio',
    description: 'Personal portfolio website of Sakib Hossain.',
    keywords: ['portfolio', 'developer', 'react', 'nextjs', 'nodejs'],
  },
};

class SettingsRepository {
  async getSettings() {
    if (require('mongoose').connection.readyState !== 1) {
      return defaultSettings;
    }
    let settings = await Settings.findOne().exec();
    if (!settings) {
      settings = await Settings.create(defaultSettings);
    }
    return settings;
  }

  async updateSettings(updateData) {
    if (require('mongoose').connection.readyState !== 1) {
      return { ...defaultSettings, ...updateData };
    }
    let settings = await Settings.findOne().exec();
    if (!settings) {
      settings = new Settings({ ...defaultSettings, ...updateData });
    } else {
      Object.assign(settings, updateData);
    }
    return await settings.save();
  }
}

module.exports = new SettingsRepository();
