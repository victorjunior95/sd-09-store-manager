const productModel = require('../models/productModel');
const helper = require('../helpers');

const createProduct = async (name, quantity) => {
  const product = await productModel.createProduct(name, quantity);

  if (helper.verifyName(name)) return helper.verifyName(name);

  if (await helper.nameExists(name)) return await helper.nameExists(name);

  if (helper.verifyQuantity(quantity)) return helper.verifyQuantity(quantity);

  return product;
};

const getAllProducts = async () => {
  const allProducts = await productModel.getAllProducts();
  const products = { products: [...allProducts] };
  return products;
};

const getProductById = async (id) => {
  const product = await productModel.getProductById(id);

  if (product === null) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  };
  return product;
};

const updateProduct = async (id, name, quantity) => {
  const product = await productModel.updateProduct(id, name, quantity);

  if (helper.verifyName(name)) return helper.verifyName(name);

  if (await helper.nameExists(name)) return await helper.nameExists(name);

  if (helper.verifyQuantity(quantity)) return helper.verifyQuantity(quantity);
  return product;
};

const deleteProduct = async (id) => {
  const product = await productModel.deleteProduct(id);

  if (product === null) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  };
  return product;
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
