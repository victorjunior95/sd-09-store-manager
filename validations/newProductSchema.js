const Joi = require('joi');

const minNameLength = 5;

module.exports = Joi.object({
  name: Joi.string().required().min(minNameLength)
});
