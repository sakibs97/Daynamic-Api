const express = require('express');
const { getEducations, createEducation, updateEducation, deleteEducation } = require('./education.controller');
const { authenticate, authorizeRoles } = require('../auth');

const router = express.Router();

router.get('/', getEducations);
router.post('/', authenticate, authorizeRoles('ADMIN'), createEducation);
router.put('/:id', authenticate, authorizeRoles('ADMIN'), updateEducation);
router.delete('/:id', authenticate, authorizeRoles('ADMIN'), deleteEducation);

module.exports = router;
