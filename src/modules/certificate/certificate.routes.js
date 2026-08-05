const express = require('express');
const { getCertificates, createCertificate, updateCertificate, deleteCertificate } = require('./certificate.controller');
const { authenticate, authorizeRoles } = require('../auth');

const router = express.Router();

router.get('/', getCertificates);
router.post('/', authenticate, authorizeRoles('ADMIN'), createCertificate);
router.put('/:id', authenticate, authorizeRoles('ADMIN'), updateCertificate);
router.delete('/:id', authenticate, authorizeRoles('ADMIN'), deleteCertificate);

module.exports = router;
