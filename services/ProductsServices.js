const ProductsModels = require('../models/ProductsModels');

const create = async (name, quantity) => {
  const hasAuthor = await ProductsModels.findByName(name);

  if (hasAuthor) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists'
      }
    };
  }

  const newProduct = await ProductsModels.create(name, quantity);
  return newProduct;
};

const getAll = async () => {
  const getAllProducts = await  ProductsModels.getAllProducts();
  return getAllProducts;
};

module.exports = {
  getAll,
  create,

};