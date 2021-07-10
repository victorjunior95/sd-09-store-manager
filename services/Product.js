const Product = require('../models/Product');

const create = async (name, quantity) => {
  const existProduct = await Product.findByName(name);
  if (existProduct) return {
    error: { code: 'invalid_data', message: 'Product already exists' }
  };
  const retorno = await Product.create(name, quantity);
  return await Product.create(name, quantity);
};

module.exports = { create };
