const Sales = require('../models/Sales');
const Joi = require('@hapi/joi');
const Products = require('../models/Product');

const quantidade = 1;
const zero = 0;

const createProductSchema = Joi.array().items({
  productId: Joi.string().required(),
  quantity: Joi.number().min(quantidade).required(),
});

const getAll = async() => {
  const sales = await Sales.getAll();
  if (sales === null) {
    return {
      code: 'not_found',
      error: { message: 'Sale not found' },
      status: 404
    };
  }
  return sales;
};

const findById = async (id) => {
  const products = await Sales.findById(id);

  if (!products) {
    return {
      code: 'not_found',
      error: { message: 'Sale not found' },
      status: 404
    };
  }

  return products;
};

const create = async (itensSold) => {
  const { error } = createProductSchema.validate(itensSold);

  if (error) { 
    return {
      code: 'invalid_data',
      error: { message: 'Wrong product ID or invalid quantity' },
      status: 422
    };
  };
  // Referência:
  // https://github.com/cleytonoliveira/store-manager/blob/main/services/SalesService.js
  let productInStock = true;

  const verifyStock = itensSold.map(async (item) => {
    const { quantity } = await Products.findById(item.productId);

    const difference = quantity - item.quantity;

    if (difference <= zero) return productInStock = false;

    return await Products.subtractQuantity(item.productId, item.quantity);
  });

  await Promise.all(verifyStock);

  if (!productInStock) {
    return {
      code: 'stock_problem',
      error: { message: 'Such amount is not permitted to sell' },
      status: 404
    };
  }

  const sale = await Sales.create(itensSold);

  return sale;
};
const update = async (id, itensSold) => {
  const { error } = createProductSchema.validate({ itensSold });

  if (error) { 
    return {
      code: 'invalid_data',
      error: { message: 'Wrong product ID or invalid quantity' },
      status: 422
    };
  };

  return await Sales.update(id,itensSold);
};

const deleteOne = async (id) => {
  const products = await Sales.findById(id);
  const sale = await Sales.deleteOne(id);
  if (!products) {
    return {
      code: 'invalid_data',
      error: { message: 'Wrong sale ID format' },
      status: 422
    };
  }
  // Referência:
  // https://github.com/cleytonoliveira/store-manager/blob/main/services/SalesService.js
  products.itensSold.forEach(async (item) => {
    await Products.sumQuantity(item.productId, item.quantity);
  });
  return sale;
};

module.exports = {
  getAll,
  create,
  findById,
  update,
  deleteOne
}; 
