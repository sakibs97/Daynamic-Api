const Education = require('./education.model');

const defaultEducations = [
  {
    institution: 'University',
    degree: 'Bachelor of Science',
    fieldOfStudy: 'Computer Science & Engineering',
    period: '2019 - 2023',
  },
];

const getEducations = async (req, res, next) => {
  try {
    let educations = await Education.find().sort({ order: 1, createdAt: -1 });
    if (!educations || educations.length === 0) {
      educations = defaultEducations;
    }
    return res.status(200).json({ success: true, data: educations });
  } catch (error) {
    return res.status(200).json({ success: true, data: defaultEducations });
  }
};

const createEducation = async (req, res, next) => {
  try {
    const education = await Education.create(req.body);
    return res.status(201).json({ success: true, data: education });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateEducation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const education = await Education.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json({ success: true, data: education });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteEducation = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Education.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: 'Education deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getEducations,
  createEducation,
  updateEducation,
  deleteEducation,
};
