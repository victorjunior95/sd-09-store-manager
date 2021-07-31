const salesModel = require('../Models/sales');
const productModel = require('../Models/functions');
const util = require('../utils');
const updateQuantity = require('../req09Ande10');
const joi = require('@hapi/joi');
const status = {
  q4: 404,
  q2: 422
};
const validetionId = /[0-9a-z]{24}/;

const validetionProduction = joi.object({
  quantity: joi.number().integer().min(1),
});

const createSales = async (product) => {
  product.forEach(({quantity}) =>{
    const { error } = validetionProduction.validate({ quantity });
    if (error) {
      const message = 'Wrong product ID or invalid quantity';
      throw  util(status.q2, 'invalid_data', message);
    }
  });

  for (const {productId, quantity} of product) {
    const num = 0;
    const prod = await productModel.findProductId(productId);
    if ((prod.quantity - quantity) < num) {
      let message = 'Such amount is not permitted to sell';
      throw util(status.q4, 'stock_problem', message);
    }
  }

  const retorne = await salesModel.addSales(product);
  updateQuantity.updateQuantityProduct(product);
  return retorne.ops[0];
};

const findSales = async () => {
  const retorne = await salesModel.findSales();
  return retorne;
};

const findSalesId = async (id) => {
  if(!validetionId.test(id)) throw util(
    status.q4,
    'not_found',
    'Sale not found'
  );

  const retorne = await salesModel.findSalesId(id);
  if(!retorne) throw util(
    status.q4,
    'not_found',
    'Sale not found'
  );
  return retorne;
};

const updateSales = async (id, sale) => {
  const { quantity } = sale[0];
  const { error } = validetionProduction.validate({ quantity });
  if (error) {
    const message = 'Wrong product ID or invalid quantity';
    throw  util(status.q2, 'invalid_data', message);
  }

  if(!validetionId.test(id)) throw util(
    status.q4,
    'not_found',
    'Sale not found'
  );

  const retorne = await salesModel.updateSales(id, sale);
  if(!retorne) throw util(
    status.q4,
    'not_found',
    'Sale not found'
  );
  const retorneSale = await salesModel.findSalesId(id);
  return retorneSale;
};

const deleteSales = async (id) => {
  if(!validetionId.test(id)) throw util(
    status.q2,
    'invalid_data',
    'Wrong sale ID format'
  );

  const retorne = await salesModel.findSalesId(id);
  if(!retorne) throw util(
    status.q2,
    'invalid_data',
    'Wrong sale ID format'
  );

  await salesModel.deleteSales(id);
  updateQuantity.subQuantityProduct(retorne.itensSold);
  return retorne;
};


module.exports = {
  createSales,
  findSales,
  findSalesId,
  updateSales,
  deleteSales,
};