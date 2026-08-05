const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema(
  {
    personal: {
      name: { type: String, default: 'Sakib Hossain' },
      designation: { type: String, default: 'Full Stack Web Developer' },
      bio: { type: String, default: 'Passionate software engineer building web applications.' },
      profileImage: { type: String, default: '' },
      resumeUrl: { type: String, default: '' },
    },
    social: {
      github: { type: String, default: 'https://github.com/sakibs97' },
      linkedin: { type: String, default: 'https://www.linkedin.com/in/sakibs97/' },
      facebook: { type: String, default: 'https://www.facebook.com/sakibs978/' },
      twitter: { type: String, default: '' },
      youtube: { type: String, default: '' },
    },
    contact: {
      email: { type: String, default: 'contact@example.com' },
      phone: { type: String, default: '+8801751051197' },
      location: { type: String, default: 'Dhaka, Bangladesh' },
    },
    hero: {
      title: { type: String, default: "Hello, I'm Sakib" },
      subtitle: { type: String, default: 'Full Stack Developer & UI/UX Designer' },
      buttonText: { type: String, default: 'Hire Me' },
    },
    about: {
      description: {
        type: String,
        default: 'I am a full-stack developer with experience in React, Next.js, Node.js, Express, and MongoDB.',
      },
    },
    seo: {
      title: { type: String, default: 'Sakib Hossain - Portfolio' },
      description: { type: String, default: 'Personal portfolio website of Sakib Hossain.' },
      keywords: { type: [String], default: ['portfolio', 'developer', 'react', 'nextjs', 'nodejs'] },
    },
  },
  {
    timestamps: true,
  }
);

const Settings = mongoose.models.Settings || mongoose.model('Settings', settingsSchema);

module.exports = Settings;
