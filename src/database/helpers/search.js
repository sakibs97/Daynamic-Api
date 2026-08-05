const getSearchQuery = (searchString, fields = []) => {
  if (!searchString || !fields.length) return {};

  const regex = new RegExp(searchString, 'i');
  return {
    $or: fields.map((field) => ({ [field]: regex })),
  };
};

module.exports = {
  getSearchQuery,
};
