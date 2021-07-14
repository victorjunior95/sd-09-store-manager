const Joi = require('@hapi/joi');
const { MIN_NUMBER } = require('../constants/magicNumbers.json');
const { ObjectId } = require('mongodb');

const create = async (sale) => {
  const { error } = Joi.array().items(
    Joi.object({
      productId: Joi.string().not().empty().required(),
      quantity: Joi.number().not().empty().min(MIN_NUMBER).required(),
    })
  ).validate(sale);

  if (error) return {
    err: { code: 'invalid_data', message: error.message }
  };

  sale.forEach(product => {
    if (!ObjectId.isValid(product.productId)) {
      return { err: { code: 'invalid_data', message: 'Wrong id format'}};
    }
  });

  const newSale = await Sale.create(sale);
  return newSale;
};

module.exports = { create };