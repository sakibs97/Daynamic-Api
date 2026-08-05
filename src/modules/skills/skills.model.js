const mongoose = require('mongoose');

const skillsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, default: 'skills' }, // 'skills' | 'tools'
    level: { type: String, default: 'Intermediate' },
    icon: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Skill = mongoose.models.Skill || mongoose.model('Skill', skillsSchema);
module.exports = Skill;
