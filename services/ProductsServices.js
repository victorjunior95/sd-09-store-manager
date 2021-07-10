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

module.exports = {
  getAll,
  create,
};