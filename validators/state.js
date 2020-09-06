const Joi = require("joi");

const createStateSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    abbreviation: Joi.string().required(),
  }),
};

const updateStateSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
  body: Joi.object({
    name: Joi.string(),
    abbreviation: Joi.string(),
  }),
};

const getStateSchema = {
  query: Joi.object({
    name: Joi.string(),
    abbreviation: Joi.string(),
    sortBy: Joi.string().valid("name", "abbreviation"),
    sortOrder: Joi.string().valid("ASC", "DSC"),
  }),
};

module.exports = {
  createStateSchema,
  updateStateSchema,
  getStateSchema,
};
