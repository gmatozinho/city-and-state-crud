const Joi = require("joi");

const createCitySchema = {
  body: Joi.object({
    name: Joi.string().required(),
    stateId: Joi.string().required(),
  }),
};

const updateCitySchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
  body: Joi.object({
    name: Joi.string(),
    stateId: Joi.string(),
  }),
};

const getCitySchema = {
  query: Joi.object({
    name: Joi.string(),
    stateId: Joi.string(),
    sortBy: Joi.string().valid("name", "stateId"),
    sortOrder: Joi.string().valid("ASC", "DSC"),
  }),
};

module.exports = {
  createCitySchema,
  updateCitySchema,
  getCitySchema,
};
