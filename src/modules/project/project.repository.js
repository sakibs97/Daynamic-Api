const Project = require('./project.model');
const { getPaginationOptions } = require('../../database/helpers/pagination');
const { getSortOptions } = require('../../database/helpers/sorting');
const { getSearchQuery } = require('../../database/helpers/search');
const { getFilterOptions } = require('../../database/helpers/filter');

class ProjectRepository {
  async findAll(query = {}) {
    if (require('mongoose').connection.readyState !== 1) {
      return {
        data: [],
        meta: {
          totalItems: 0,
          totalPages: 1,
          currentPage: 1,
          pageSize: 10,
          hasNextPage: false,
          hasPrevPage: false,
        },
      };
    }

    const { skip, limit, page, buildMeta } = getPaginationOptions(query);
    const sort = getSortOptions(query.sort, '-createdAt');
    const filters = getFilterOptions(query, ['category', 'status', 'featured']);
    const search = getSearchQuery(query.search, ['title', 'shortDescription', 'description', 'technologies']);

    const mongoFilter = {
      ...filters,
      ...search,
    };

    const totalItems = await Project.countDocuments(mongoFilter);
    const data = await Project.find(mongoFilter).sort(sort).skip(skip).limit(limit).exec();

    return {
      data,
      meta: buildMeta(totalItems),
    };
  }

  async findBySlug(slug) {
    if (require('mongoose').connection.readyState !== 1) return null;
    return await Project.findOne({ slug }).exec();
  }

  async findById(id) {
    if (require('mongoose').connection.readyState !== 1) return null;
    return await Project.findById(id).exec();
  }

  async create(projectData) {
    if (require('mongoose').connection.readyState !== 1) {
      return { _id: 'mock_id', ...projectData };
    }
    const project = new Project(projectData);
    return await project.save();
  }

  async update(id, updateData) {
    if (require('mongoose').connection.readyState !== 1) {
      return { _id: id, ...updateData };
    }
    return await Project.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).exec();
  }

  async delete(id) {
    if (require('mongoose').connection.readyState !== 1) return true;
    return await Project.findByIdAndDelete(id).exec();
  }

  async updateFeatured(id, featured) {
    if (require('mongoose').connection.readyState !== 1) return { _id: id, featured };
    return await Project.findByIdAndUpdate(id, { featured }, { new: true }).exec();
  }

  async updateStatus(id, status) {
    if (require('mongoose').connection.readyState !== 1) return { _id: id, status };
    return await Project.findByIdAndUpdate(id, { status }, { new: true }).exec();
  }
}

module.exports = new ProjectRepository();
