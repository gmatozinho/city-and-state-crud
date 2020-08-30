const { city } = require("./schemas");

const create = async (body) => {
  try {
    const newcity = new city({ ...body });

    const result = await newcity.save();

    return result;
  } catch (error) {
    throw error;
  }
};

const read = async () => {
  try {
    const result = await city.find();

    return result;
  } catch (error) {
    throw error;
  }
};

const readById = async (id) => {
  try {
    const result = await city.findOne({ _id: id });

    return result;
  } catch (error) {
    throw error;
  }
};

const update = async (id, body) => {
  try {
    const result = await city.findOneAndUpdate({ _id: id }, body, {
      new: true,
    });

    return result;
  } catch (error) {
    throw error;
  }
};

const remove = async (id) => {
  try {
    const result = await city.findOneAndDelete({ _id: id });

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
