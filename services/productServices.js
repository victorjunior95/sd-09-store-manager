const productModel = require('../models/productModel');

const findAll = async () => {
  const products = await productModel.getAll();

  return products;
};

const findById = async (id) => {
  const product = await productModel.getById(id);

  return product;
};

const create = async (name, quantity,) => {
  const product = await productModel.getByName(name);

  if (product) {
    throw {
      customError: {
        err: {
          code: 'invalid_data',
          message: 'Product already exists',
        },
      },
    };
  };

  const newProduct = await productModel.create(name, quantity);

  return newProduct;
};

const update = async (id, name, quantity) => {
  const updatedProduct = await productModel.update(id, name, quantity);

  return updatedProduct;
};

const exclude = async (id) => {
  const deletedProduct = await productModel.exclude(id);

  return deletedProduct;
};

module.exports = { 
  findAll,
  findById,
  create,
  update,
  exclude,
};
