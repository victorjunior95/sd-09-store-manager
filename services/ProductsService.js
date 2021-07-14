const ProductsModel = require('../models/ProductsModel');

const deleteProduct = async (id) => {
  const product = await ProductsModel.deleteProduct(id);

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

const updateProduct = async (id, name, quantity) => {
  const product = await ProductsModel.updateProduct(id, name, quantity);

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

const getAllProducts = async () => {
  const product = await ProductsModel.getAllProducts();

  return product;
};

const getProductById = async (id) => {
  const product = await ProductsModel.getProductById(id);

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

const addProduct = async (name, quantity) => {
  const product = await ProductsModel.findProductByName(name);

  if (product) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      }
    };
  }

  const { insertedId } = await ProductsModel.addProduct(name, quantity);

  return {
    _id: insertedId,
    name,
    quantity
  };
};



module.exports = {
  deleteProduct,
  updateProduct,
  getProductById,
  getAllProducts,
  addProduct,
};
