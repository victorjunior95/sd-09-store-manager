const products = require('../models/productsModule');
const validate = require('./validateProducts');


const create = async (product) => {
  await validate.name(product.name);
  validate.quantity(product.quantity);
  
  const result = await products.create(product);
  return result;
};

module.exports = {
  create,
};