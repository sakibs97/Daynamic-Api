const projectRepository = require('./project.repository');
const ApiError = require('../../common/exceptions/ApiError');

class ProjectService {
  async getAllProjects(query) {
    return await projectRepository.findAll(query);
  }

  async getProjectBySlug(slug) {
    const project = await projectRepository.findBySlug(slug);
    if (!project) {
      throw new ApiError(404, 'Project not found with requested slug', [], null, 'ERR_NOT_FOUND');
    }
    return project;
  }

  async getProjectById(id) {
    const project = await projectRepository.findById(id);
    if (!project) {
      throw new ApiError(404, 'Project not found', [], null, 'ERR_NOT_FOUND');
    }
    return project;
  }

  async createProject(projectData) {
    return await projectRepository.create(projectData);
  }

  async updateProject(id, updateData) {
    await this.getProjectById(id);
    return await projectRepository.update(id, updateData);
  }

  async deleteProject(id) {
    await this.getProjectById(id);
    return await projectRepository.delete(id);
  }

  async toggleFeatured(id, featured) {
    await this.getProjectById(id);
    return await projectRepository.updateFeatured(id, featured);
  }

  async updateStatus(id, status) {
    await this.getProjectById(id);
    return await projectRepository.updateStatus(id, status);
  }
}

module.exports = new ProjectService();
