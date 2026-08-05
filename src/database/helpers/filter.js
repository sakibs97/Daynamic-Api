const getFilterOptions = (query = {}, allowedFilters = []) => {
  const filter = {};
  allowedFilters.forEach((key) => {
    if (query[key] !== undefined && query[key] !== '') {
      filter[key] = query[key];
    }
  });
  return filter;
};

module.exports = {
  getFilterOptions,
};
