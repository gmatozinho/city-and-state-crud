const build = (params) => {
  const filter = {};
  Object.keys(params).forEach((key) => {
    filter[key] = { $regex: `${params[key]}`, $options: "i" };
  });

  return filter;
};


const buildSortConfig = (sortBy, sortOrder) => {
  const sortConfig = {};
  if (sortBy) {
    if (sortOrder == "DSC") {
      sortConfig[sortBy] = -1;
    } else {
      sortConfig[sortBy] = 1;
    }
  }
  return sortConfig;
};


module.exports = {
  build,
  buildSortConfig
};
