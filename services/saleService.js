const productModel = require('../models/productModel');
const saleModel = require('../models/saleModel');
const Joi = require('@hapi/joi');

const minQuant = 1;
const zero = 0;

const validateSale = Joi.array().items({
  productId: Joi.string().required(),
  quantity: Joi.number().min(minQuant).required(),
});

const create = async (itensSold) => {
  const { error } = validateSale.validate(itensSold);
  
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
    const { quantity } = await productModel.getById(item.productId);
  
    const difference = quantity - item.quantity;
  
    if (difference <= zero) return productInStock = false;
  
    return await productModel.subtractQuantity(item.productId, item.quantity);
  });
  
  await Promise.all(verifyStock);
  
  if (!productInStock) {
    return {
      code: 'stock_problem',
      error: { message: 'Such amount is not permitted to sell' },
      status: 404
    };
  }
  
  const sale = await saleModel.create(itensSold);
  
  return sale;
};


module.exports = {
  create,
};