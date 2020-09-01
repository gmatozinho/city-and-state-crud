const { state } = require("./schemas");
const utils = require("../utils");

const create = async (body) => {
  try {
    const newstate = new state({ ...body });

    const result = await newstate.save();

    return result;
  } catch (error) {
    throw error;
  }
};

const read = async (params, sortConfig) => {
  try {
    const filter = utils.filter.build(params);
    const result = await state.find(filter).sort(sortConfig);

    return result;
  } catch (error) {
    throw error;
  }
};

const readById = async (id) => {
  try {
    const result = await state.findOne({ _id: id });

    return result;
  } catch (error) {
    throw error;
  }
};

const update = async (id, body) => {
  try {
    const result = await state.updateOne({ _id: id }, body, {
      new: true,
    });

    return result;
  } catch (error) {
    throw error;
  }
};

const remove = async (id) => {
  try {
    const result = await state.findOneAndDelete({ _id: id });

    return result;
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
