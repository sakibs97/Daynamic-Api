const projectRoutes = require('./project.routes');
const projectService = require('./project.service');
const projectRepository = require('./project.repository');
const Project = require('./project.model');

module.exports = {
  projectRoutes,
  projectService,
  projectRepository,
  Project,
};
