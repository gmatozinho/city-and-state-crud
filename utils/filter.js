const build = (params) => {
  const filter = {};
  Object.keys(params).forEach((key) => {
    filter[key] = { $regex: `${params[key]}`, $options: "i" };
  });

  return filter;
};

module.exports = {
  build,
};
