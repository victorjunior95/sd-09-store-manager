const Joi = require('@hapi/joi');

const validateProductInput = (req, _res, next) => {
  const minNameLength = 5;

  const { error } = Joi.object({
    name: Joi.string().min(minNameLength).not().empty().required(),
    quantity: Joi.number().min(1).not().empty().required(),
  }).validate(req.body);

  if(error) return next(error);

  next();
};

module.exports = validateProductInput;
