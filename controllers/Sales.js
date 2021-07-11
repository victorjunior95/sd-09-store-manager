const rescue = require('express-rescue');
const Joi = require('joi');

const Sales = require('../services/Sales');

const MIN_NAME = 5;
const MIN_QUANTITY = 1;

const CODE_CREATE = 201;
const CODE_VALUE = 200;

const create = rescue(async (req, res, next) => {
  // Validando valores dentro de array
  // https://stackoverflow.com/questions/37744483/how-to-validate-array-of-objects-using-joi
  const { error } = Joi.array()
    .items(
      Joi.object().keys({
        productId: Joi.string().not().empty().min(MIN_NAME).required(),
        quantity: Joi.number().integer().min(MIN_QUANTITY).required(),
      }),
    )
    .validate(req.body);

  if (error) {
    error.details[0].message = 'Wrong product ID or invalid quantity';
    return next(error);
  }

  const newSale = await Sales.create(req.body);

  if (newSale.err) return next(newSale);

  return res.status(CODE_VALUE).json(newSale[0]);
});

const getAll = rescue(async (_req, res) => {
  const sales = await Sales.getAll();

  return res.status(CODE_VALUE).json({ sales });
});

const findById = rescue(async (req, res, next) => {
  const { id } = req.params;

  const findSale = await Sales.findById(id);

  if (findSale.err) return next(findSale);

  return res.status(CODE_VALUE).json(findSale);
});

module.exports = {
  create,
  getAll,
  findById,
};
