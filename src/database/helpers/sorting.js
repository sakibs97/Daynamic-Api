const getSortOptions = (querySort, defaultSort = '-createdAt') => {
  if (!querySort) return defaultSort;

  // Supports format 'field:asc' or 'field:desc' or '-field'
  if (querySort.includes(':')) {
    const [field, order] = querySort.split(':');
    return order.toLowerCase() === 'desc' ? `-${field}` : field;
  }

  return querySort;
};

module.exports = {
  getSortOptions,
};
