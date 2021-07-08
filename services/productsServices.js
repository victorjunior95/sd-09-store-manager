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

module.exports = {
  postNewProduct,
  getAllProducts,
  getProductById,
};
