const Certificate = require('./certificate.model');

const defaultCertificates = [
  { title: 'English', issuer: '', issueDate: '' },
  { title: 'Full Stack Web Development', issuer: '', issueDate: '' },
];

const getCertificates = async (req, res, next) => {
  try {
    let certificates = await Certificate.find().sort({ order: 1, createdAt: -1 });
    if (!certificates || certificates.length === 0) {
      certificates = defaultCertificates;
    }
    return res.status(200).json({ success: true, data: certificates });
  } catch (error) {
    return res.status(200).json({ success: true, data: defaultCertificates });
  }
};

const createCertificate = async (req, res, next) => {
  try {
    const certificate = await Certificate.create(req.body);
    return res.status(201).json({ success: true, data: certificate });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateCertificate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const certificate = await Certificate.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json({ success: true, data: certificate });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteCertificate = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Certificate.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: 'Certificate deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getCertificates,
  createCertificate,
  updateCertificate,
  deleteCertificate,
};
