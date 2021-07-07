const Joi = require('joi');

const validatorNameAndQuant = (req, res, next) => {
  const { error } = Joi.object({
    name: Joi.string().min(5).required(),
    quantity: Joi.number().integer().min(1).required(),
  }).validate(req.body);

  if (error) return next(error);

  next();
};

module.exports = {
  validatorNameAndQuant
};
