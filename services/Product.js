const Product = require('../models/Product');

const create = async (name, quantity) => {
  const existProduct = await Product.findByName(name);
  if (existProduct) return {
    error: { code: 'invalid_data', message: 'Product already exists' }
  };
  return await Product.create(name, quantity);
};

const getAll = async () => {
  const products = await Product.getAll();
  return { products };
};

const findById = async (id) => {
  const product = await Product.findById(id);
  if (!product) return { error: { code: 'invalid_data', message: 'Wrong id format' } };
  return product;
};

const edit = async (id, name, quantity) => {
  const existProduct = await Product.findById(id);
  if (!existProduct) return { error:
    { code: 'invalid_data', message: 'Wrong id format' }
  };
  return await Product.edit(id, name, quantity);
};

const deleteOne = async (id) => {
  const existProduct = await Product.findById(id);
  if (!existProduct) return { error:
    { code: 'invalid_data', message: 'Wrong id format' }
  };
  return Product.deleteOne(id);
};

module.exports = { create, getAll, findById, edit, deleteOne };
