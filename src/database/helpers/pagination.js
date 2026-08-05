const getPaginationOptions = (query = {}) => {
  const page = Math.max(1, parseInt(query.page || '1', 10));
  const limit = Math.min(100, Math.max(1, parseInt(query.limit || '10', 10)));
  const skip = (page - 1) * limit;

  const buildMeta = (totalItems) => {
    const totalPages = Math.ceil(totalItems / limit) || 1;
    return {
      totalItems,
      totalPages,
      currentPage: page,
      pageSize: limit,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    };
  };

  return { skip, limit, page, buildMeta };
};

module.exports = {
  getPaginationOptions,
};
