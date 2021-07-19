const joi = require('@hapi/joi');

const MIN_NAME_LENGTH = 5;
const MIN_QUANTITY = 1;

const Products = joi.object({
  name: joi
    .string()
    .min(MIN_NAME_LENGTH)
    .required(),
  quantity: joi
    .number()
    .min(MIN_QUANTITY)
    .required(),
})
  .messages({
    'any.required': '{#label} Campo necessário.'
  });

module.exports = {
  Products,
};
