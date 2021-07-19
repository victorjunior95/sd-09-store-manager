const Product = require('../models/Product');

const create = async (name, quantity) => {
  const existProduct = await Product.findByName(name);
  if (existProduct) return {
    error: { code: 'invalid_data', message: 'Product already exists' }
  };
  const retorno = await Product.create(name, quantity);
  return await Product.create(name, quantity);
};

const getAll = async () => {
  const products = await Product.getAll();
  return { products };
};

const findById = async (id) => {
  const product = await Product.findById(id);
  console.log('product na service: ' + product);
  if (!product) return { error: { code: 'invalid_data', message: 'Wrong id format' } };
  return product;
};

module.exports = { create, getAll, findById };
