const productsModel = require('../models/productsModel');

const postNewProduct = async ({name, quantity}) => {
  const product = await productsModel.postNewProduct({ name, quantity });

  if(!product) return ({
    err: {
      code: 'invalid_data',
      message: 'Product already exists'
    },
  });

  return product;
};

const getAllProducts = async () => {
  const result = await productsModel.getAllProducts();

  return result;
};

const getProductById = async (id) => {
  const result = await productsModel.getProductById(id);

  return result;
};

const updateProduct = async ({ id, name, quantity }) => {
  const result = await productsModel.updateProduct({ id, name, quantity });

  return result;
};

const deleteProduct = async (id) => {
  const result = await productsModel.deleteProduct(id);

  if (!result) return ({
    err: {
      code: 'invalid_data',
      message: 'Wrong id format'
    },
  });

  return result;
};

module.exports = {
  postNewProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
