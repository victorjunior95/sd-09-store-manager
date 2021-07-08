const Joi = require('@hapi/joi');

const MIN_LENGTH = 5;
const MIN_NUMBER = 1;

const checkMiddleware = (req, _res, next) => {
  const { error } = Joi.object({
    name: Joi.string().min(MIN_LENGTH).required(),
    quantity: Joi.number().min(MIN_NUMBER).required(),
  }).validate(req.body);

  if (error) return next(error);

  next();
};

module.exports = checkMiddleware;
