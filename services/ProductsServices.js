const ProductsModels = require('../models/ProductsModels');
const DELETED_COUNT = 0;

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

const updateOne = async (id, name, quantity) => {
  const updateProduct = await ProductsModels.updateOne(id, name, quantity);

  if (!updateProduct) {
    return {
      error: {
        code: 'invalid_data',
        message: 'Product already exists' 
      }
    };
  }

  return updateProduct;
};

const deleteProduct = async (id) => {
  const deleted = await ProductsModels.deleteProduct(id);
  
  if (!deleted) {
    return {
      error: {
        code: 'invalid_data',
        message: 'Wrong id format'
      }
    };
  }

  return deleted;
};

module.exports = {
  getAll,
  create,
  getById,
  updateOne,
  deleteProduct
};