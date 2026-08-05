const express = require('express');
const { healthRoutes } = require('../modules/health');
const { authRoutes } = require('../modules/auth');
const { uploadRoutes } = require('../modules/upload');
const { settingsRoutes } = require('../modules/settings');
const { projectRoutes } = require('../modules/project');
const { skillsRoutes } = require('../modules/skills');
const { experienceRoutes } = require('../modules/experience');
const { educationRoutes } = require('../modules/education');
const { certificateRoutes } = require('../modules/certificate');
const { messageRoutes } = require('../modules/message');

const router = express.Router();

router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/upload', uploadRoutes);
router.use('/settings', settingsRoutes);
router.use('/projects', projectRoutes);
router.use('/skills', skillsRoutes);
router.use('/experiences', experienceRoutes);
router.use('/educations', educationRoutes);
router.use('/certificates', certificateRoutes);
router.use('/messages', messageRoutes);

module.exports = router;
