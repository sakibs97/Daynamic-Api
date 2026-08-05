const express = require('express');
const { getSkills, createSkill, updateSkill, deleteSkill } = require('./skills.controller');
const { authenticate, authorizeRoles } = require('../auth');

const router = express.Router();

router.get('/', getSkills);
router.post('/', authenticate, authorizeRoles('ADMIN'), createSkill);
router.put('/:id', authenticate, authorizeRoles('ADMIN'), updateSkill);
router.delete('/:id', authenticate, authorizeRoles('ADMIN'), deleteSkill);

module.exports = router;
