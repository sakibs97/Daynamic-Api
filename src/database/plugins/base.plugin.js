module.exports = function basePlugin(schema, options = {}) {
  schema.add({
    isDeleted: { type: Boolean, default: false, index: true },
    deletedAt: { type: Date, default: null },
    createdBy: { type: String, default: null },
    updatedBy: { type: String, default: null },
  });

  if (!schema.options.timestamps) {
    schema.set('timestamps', true);
  }

  // Soft delete method
  schema.methods.softDelete = async function (userId = null) {
    this.isDeleted = true;
    this.deletedAt = new Date();
    if (userId) this.updatedBy = userId;
    return await this.save();
  };

  // Pre-find hook to filter out soft-deleted records by default
  const excludeDeleted = function (next) {
    if (!this.getFilter().includeDeleted) {
      this.where({ isDeleted: false });
    }
    next();
  };

  schema.pre('find', excludeDeleted);
  schema.pre('findOne', excludeDeleted);
  schema.pre('findOneAndUpdate', excludeDeleted);
  schema.pre('countDocuments', excludeDeleted);
};
