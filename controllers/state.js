const { state } = require("../db");
const utils = require("./utils")
const create = async (body) => {
  try {
    const savedstate = await state.create(body);

    return savedstate;
  } catch (error) {
    throw error;
  }
};

const read = async (params) => {
  try {
    const sortConfig = buildSortConfig(params.sortBy, params.sortOrder);
    utils.params.deleteSortParams(params)

    const cities = await state.read(params,sortConfig);

    return cities;
  } catch (error) {
    throw error;
  }
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

const readById = async (id) => {
  try {
    const wantedstate = await state.readById(id);

    return wantedstate;
  } catch (error) {
    throw error;
  }
};

const update = async (id, body) => {
  try {
    const updatedstate = await state.update(id, body);

    return updatedstate;
  } catch (error) {
    throw error;
  }
};

const remove = async (id) => {
  try {
    const deletedstate = await state.remove(id);

    return deletedstate;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  create,
  read,
  readById,
  update,
  remove,
};
