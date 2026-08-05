const Experience = require('./experience.model');

const defaultExperiences = [
  {
    company: 'Self-Employed / Freelance',
    position: 'Frontend Web Developer',
    period: '2023 - Present',
    description: 'Building responsive web applications using React, Next.js, and Tailwind CSS.',
  },
];

const getExperiences = async (req, res, next) => {
  try {
    let experiences = await Experience.find().sort({ order: 1, createdAt: -1 });
    if (!experiences || experiences.length === 0) {
      experiences = defaultExperiences;
    }
    return res.status(200).json({ success: true, data: experiences });
  } catch (error) {
    return res.status(200).json({ success: true, data: defaultExperiences });
  }
};

const createExperience = async (req, res, next) => {
  try {
    const experience = await Experience.create(req.body);
    return res.status(201).json({ success: true, data: experience });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateExperience = async (req, res, next) => {
  try {
    const { id } = req.params;
    const experience = await Experience.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json({ success: true, data: experience });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteExperience = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Experience.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: 'Experience deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
};
