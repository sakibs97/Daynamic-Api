const Skill = require('./skills.model');

const defaultSkills = [
  { name: 'HTML', category: 'skills' },
  { name: 'CSS', category: 'skills' },
  { name: 'JavaScript', category: 'skills' },
  { name: 'Bootstrap', category: 'skills' },
  { name: 'Tailwind CSS', category: 'skills' },
  { name: 'React.js', category: 'skills' },
  { name: 'Next.js', category: 'skills' },
  { name: 'Redux', category: 'skills' },
  { name: 'Firebase', category: 'skills' },
  { name: 'MongoDB', category: 'skills' },
  { name: 'Express', category: 'skills' },
  { name: 'Node.js', category: 'skills' },
  { name: 'NestJS', category: 'skills' },
  { name: 'Angular', category: 'skills' },
  { name: 'TypeScript', category: 'skills' },
  { name: 'API', category: 'skills' },
  { name: 'System Design', category: 'skills' },
  { name: 'Version Control', category: 'skills' },
  { name: 'Schema', category: 'skills' },
  { name: 'VS Code', category: 'tools' },
  { name: 'Git', category: 'tools' },
  { name: 'Github', category: 'tools' },
  { name: 'Figma', category: 'tools' },
  { name: 'Postman', category: 'tools' },
  { name: 'FileZilla', category: 'tools' },
  { name: 'PuTTY', category: 'tools' },
];

const getSkills = async (req, res, next) => {
  try {
    let skills = await Skill.find().sort({ order: 1, createdAt: -1 });
    if (!skills || skills.length === 0) {
      skills = defaultSkills;
    }
    return res.status(200).json({ success: true, data: skills });
  } catch (error) {
    return res.status(200).json({ success: true, data: defaultSkills });
  }
};

const createSkill = async (req, res, next) => {
  try {
    const { name, category, level, icon, order } = req.body;
    const skill = await Skill.create({ name, category, level, icon, order });
    return res.status(201).json({ success: true, data: skill });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateSkill = async (req, res, next) => {
  try {
    const { id } = req.params;
    const skill = await Skill.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json({ success: true, data: skill });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteSkill = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Skill.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: 'Skill deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
};
