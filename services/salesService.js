const Joi = require('@hapi/joi');

const model = require('../models/salesModel');

const NOT_FOUND = 404;
const UNPROCESSABLE_ENTITY = 422;

const validateSale = Joi.array().items({
  productId: Joi.string().required(),
  quantity: Joi.number().min(1).required()
});

const create = async (items) => {
  const { error } = validateSale.validate(items);

  if (error) {
    return {
      status: UNPROCESSABLE_ENTITY,
      code: 'invalid_data',
      error: { message: 'Wrong product ID or invalid quantity' }
    };
  };

  const newSale = model.create(items);

  return newSale;
};

const getAll = async () => {
  const sales = await model.getAll();

  return sales;
};

const getById = async (id) => {
  const sale = await model.getById(id);

  if (!sale) {
    return {
      status: NOT_FOUND,
      code: 'not_found',
      error: { message: 'Sale not found' }
    };
  }

  return sale;
};

const update = async(id, item) => {
  const { error } = validateSale.validate(item);

  if (error) {
    return {
      status: UNPROCESSABLE_ENTITY,
      code: 'invalid_data',
      error: { message: 'Wrong product ID or invalid quantity' }
    };
  };

  const updateSale = await model.update(id, item);

  return updateSale;
};

const destroy = async(id) => {
  const saleDeleted = await model.destroy(id);

  if (!saleDeleted) {
    return {
      status: UNPROCESSABLE_ENTITY,
      code: 'invalid_data',
      error: { message: 'Wrong sale ID format' }
    };
  }

  return saleDeleted;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  destroy,
};
