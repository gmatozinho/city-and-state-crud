const { city } = require("../db");
const utils = require("../utils");

const create = async (body) => {
  try {
    const savedCity = await city.create(body);

    return savedCity;
  } catch (error) {
    throw error;
  }
};

const read = async (params) => {
  try {
    const sortConfig = utils.filter.buildSortConfig(
      params.sortBy,
      params.sortOrder
    );

    utils.params.deleteSortParams(params);

    const cities = await city.read(params, sortConfig);

    return cities;
  } catch (error) {
    throw error;
  }
};
const readById = async (id) => {
  try {
    const wantedCity = await city.readById(id);

    return wantedCity;
  } catch (error) {
    throw error;
  }
};

const update = async (id, body) => {
  try {
    const updatedCity = await city.update(id, body);

    return updatedCity;
  } catch (error) {
    throw error;
  }
};

const remove = async (id) => {
  try {
    const deletedCity = await city.remove(id);

    return deletedCity;
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
