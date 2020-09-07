const Joi = require("joi");

const idParamsSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
};

module.exports = {
  idParamsSchema,
};
