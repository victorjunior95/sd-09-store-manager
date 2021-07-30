const salesModel = require('../Models/sales');
const util = require('../utils');
const joi = require('@hapi/joi');
const num = 0;
const status = 422;
const mim = 5;
const validetionId = /[0-9a-z]{24}/;

const validetionProduction = joi.object({
  quantity: joi.number().integer().min(1),
});


const createSales = async (product) => {

  product.forEach(({quantity}) =>{
    const { error } = validetionProduction.validate({ quantity });
    if (error) {
      const message = 'Wrong product ID or invalid quantity';
      throw  util(status, 'invalid_data', message);
    }
  });

  const retorne = await salesModel.addSales(product);
  return retorne.ops[0];
};

module.exports = {
  createSales
};