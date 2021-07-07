const ProductsModel = require('../models/ProductsModel');

const findByName = async (name) => {
  const product = await ProductsModel.findByName(name);

  return product;
};

const createProduct = async (name, quantity) => {
  const product = await ProductsModel.findByName(name);

  if (product) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  }

  const { insertedId } = await ProductsModel.createProduct(name, quantity);

  return {
    _id: insertedId,
    name,
    quantity
  };
};

module.exports = {
  findByName,
  createProduct
};
