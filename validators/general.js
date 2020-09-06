const Joi = require("joi");

const getByIdSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
};

module.exports = {
  getByIdSchema,
};
