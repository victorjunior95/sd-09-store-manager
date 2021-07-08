const Joi = require('@hapi/joi');

const validProducts = (req, _res, next) => {
  const NAME_LENGTH = 5;
  const MIN_QUANTITY = 1;
  
  const { error } = Joi.object({
    name: Joi.string().min(NAME_LENGTH).not().empty().required(),
    quantity: Joi.number().min(MIN_QUANTITY).not().empty().required()
  }).validate(req.body);

  if (error) return next(error);

  next();
};

module.exports = validProducts;
