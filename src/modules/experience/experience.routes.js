const express = require('express');
const { getExperiences, createExperience, updateExperience, deleteExperience } = require('./experience.controller');
const { authenticate, authorizeRoles } = require('../auth');

const router = express.Router();

router.get('/', getExperiences);
router.post('/', authenticate, authorizeRoles('ADMIN'), createExperience);
router.put('/:id', authenticate, authorizeRoles('ADMIN'), updateExperience);
router.delete('/:id', authenticate, authorizeRoles('ADMIN'), deleteExperience);

module.exports = router;
