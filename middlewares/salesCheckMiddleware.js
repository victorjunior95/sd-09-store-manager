const Joi = require('@hapi/joi');

const MIN_NUMBER = 1;

const salesCheckMiddleware = (req, _res, next) => {
  const { error } = Joi.array().items(
    Joi.object({
      productId: Joi.string().required(),
      quantity: Joi.number().min(MIN_NUMBER).required(),
    }),
  ).validate(req.body);

  return error
    ? next(
      { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' },
    )
    : next();
};

module.exports = salesCheckMiddleware;
