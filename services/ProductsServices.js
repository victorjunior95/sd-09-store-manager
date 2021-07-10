const ProductsModels = require('../models/ProductsModels');

const create = async (name, quantity) => {
  const hasAuthor = await ProductsModels.findByName(name);

  if (hasAuthor) return {
    error: { code: 'invalid_data', message: 'Product already exists' }
  };

  return ProductsModels.create(name, quantity);
};

const getAll = async () => {
  const getAllProducts = await  ProductsModels.getAllProducts();
  return getAllProducts;
};

const getById = async (id) => {
  const getProducts = await ProductsModels.findById(id);

  if (!getProducts) {
    return {
      error : {
        code: 'invalid_data',
        message: 'Wrong id format'
      }
    };
  }
  
  return getProducts;
};

module.exports = {
  getAll,
  create,
  getById
};