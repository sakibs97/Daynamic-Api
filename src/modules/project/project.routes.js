const express = require('express');
const {
  getProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
  toggleFeatured,
  updateStatus,
} = require('./project.controller');
const { validateBody } = require('../../common/validation');
const {
  createProjectSchema,
  updateProjectSchema,
  toggleFeaturedSchema,
  updateStatusSchema,
} = require('./project.validator');
const { authenticate, authorizeRoles } = require('../auth');

const router = express.Router();

// Public Endpoints
router.get('/', getProjects);
router.get('/:slug', getProjectBySlug);

// Admin Protected Endpoints
router.post('/', authenticate, authorizeRoles('ADMIN'), validateBody(createProjectSchema), createProject);
router.put('/:id', authenticate, authorizeRoles('ADMIN'), validateBody(updateProjectSchema), updateProject);
router.delete('/:id', authenticate, authorizeRoles('ADMIN'), deleteProject);
router.patch('/:id/featured', authenticate, authorizeRoles('ADMIN'), validateBody(toggleFeaturedSchema), toggleFeatured);
router.patch('/:id/status', authenticate, authorizeRoles('ADMIN'), validateBody(updateStatusSchema), updateStatus);

module.exports = router;
