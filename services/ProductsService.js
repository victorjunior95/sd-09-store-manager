const ProductsModel = require('../models/ProductsModel');

const getAllProducts = async () => {
  const product = await ProductsModel.getAllProducts();

  return product;
};

const findById = async (id) => {
  const product = await ProductsModel.findById(id);

  if (!product) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }

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
  createProduct,
  findById,
  getAllProducts
};
