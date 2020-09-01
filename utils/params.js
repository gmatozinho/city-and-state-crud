const deleteSortParams = (params) => {
  delete params["sortBy"];
  delete params["sortOrder"];
};

module.exports = {
  deleteSortParams,
};
