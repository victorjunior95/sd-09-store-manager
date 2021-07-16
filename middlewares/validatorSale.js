const Joi = require('joi');


const validatorNameQuant = (req, _res, next) => {
  const min = 5;
  const { error } = Joi.object({
    name: Joi.string().min(min).required(),
    quantity: Joi.number().integer().min(1).required(),
  }).validate(req.body);

  if (error) return next(error);

  next();
};

const validatorId = (req, _res, next) => {
  const { id } = req.params;
  const regexId = /[0-9A-Fa-f]{6}/g;

  if (!regexId.test(id)) {
    return next({
      code: 'invalid_data',
      message: 'Wrong id format',
    });
  }

  next();
};

module.exports = {
  validatorId,
  validatorNameQuant,
};
