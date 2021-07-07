const Joi = require('joi');

const validProducts = (req, _res, next) => {
  const NAME_LENGTH = 5;
  
  const { error } = Joi.object({
    name: Joi.string().min(NAME_LENGTH).not().empty().required(),
    quantity: Joi.number().not().empty().required()
  }).validate(req.body);

  if (error) return next(error);

  next();
};

module.exports = validProducts;
