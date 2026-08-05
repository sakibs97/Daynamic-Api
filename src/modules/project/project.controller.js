const projectService = require('./project.service');
const asyncHandler = require('../../utils/asyncHandler');
const { sendSuccess } = require('../../common/responses');

/**
 * @openapi
 * /projects:
 *   get:
 *     tags:
 *       - Projects
 *     summary: Get Paginated Projects List
 *     description: Returns list of projects with pagination, sorting, search, category, status, and featured filtering (Public).
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [Web, Mobile, Dashboard, UIUX, API, Other]
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [Draft, Published]
 *       - in: query
 *         name: featured
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: Projects list retrieved successfully.
 */
const getProjects = asyncHandler(async (req, res) => {
  const { data, meta } = await projectService.getAllProjects(req.query);
  return sendSuccess(res, 200, 'Projects list retrieved', data, meta);
});

/**
 * @openapi
 * /projects/{slug}:
 *   get:
 *     tags:
 *       - Projects
 *     summary: Get Single Project by Slug
 *     description: Returns detailed project object by URL slug (Public).
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project details retrieved.
 *       404:
 *         description: Project not found.
 */
const getProjectBySlug = asyncHandler(async (req, res) => {
  const project = await projectService.getProjectBySlug(req.params.slug);
  return sendSuccess(res, 200, 'Project details retrieved', project);
});

/**
 * @openapi
 * /projects:
 *   post:
 *     tags:
 *       - Projects
 *     summary: Create New Portfolio Project
 *     description: Creates a new portfolio project entry (Admin Only).
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *               shortDescription:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *                 enum: [Web, Mobile, Dashboard, UIUX, API, Other]
 *     responses:
 *       201:
 *         description: Project created successfully.
 */
const createProject = asyncHandler(async (req, res) => {
  const project = await projectService.createProject(req.body);
  return sendSuccess(res, 201, 'Project created successfully', project);
});

/**
 * @openapi
 * /projects/{id}:
 *   put:
 *     tags:
 *       - Projects
 *     summary: Update Existing Project
 *     description: Updates project details by ID (Admin Only).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project updated.
 */
const updateProject = asyncHandler(async (req, res) => {
  const project = await projectService.updateProject(req.params.id, req.body);
  return sendSuccess(res, 200, 'Project updated successfully', project);
});

/**
 * @openapi
 * /projects/{id}:
 *   delete:
 *     tags:
 *       - Projects
 *     summary: Delete Project
 *     description: Removes a project by ID (Admin Only).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project deleted.
 */
const deleteProject = asyncHandler(async (req, res) => {
  await projectService.deleteProject(req.params.id);
  return sendSuccess(res, 200, 'Project deleted successfully');
});

/**
 * @openapi
 * /projects/{id}/featured:
 *   patch:
 *     tags:
 *       - Projects
 *     summary: Toggle Project Featured Status
 *     description: Sets or unsets project featured flag (Admin Only).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - featured
 *             properties:
 *               featured:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Featured flag updated.
 */
const toggleFeatured = asyncHandler(async (req, res) => {
  const project = await projectService.toggleFeatured(req.params.id, req.body.featured);
  return sendSuccess(res, 200, 'Project featured flag updated', project);
});

/**
 * @openapi
 * /projects/{id}/status:
 *   patch:
 *     tags:
 *       - Projects
 *     summary: Update Project Status
 *     description: Sets project status to Draft or Published (Admin Only).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Draft, Published]
 *     responses:
 *       200:
 *         description: Project status updated.
 */
const updateStatus = asyncHandler(async (req, res) => {
  const project = await projectService.updateStatus(req.params.id, req.body.status);
  return sendSuccess(res, 200, 'Project status updated', project);
});

module.exports = {
  getProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
  toggleFeatured,
  updateStatus,
};
