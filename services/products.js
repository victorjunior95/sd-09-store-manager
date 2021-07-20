const products = require('../models/products');

const postProduct = async (name, quantity) => {
  const findOne =  await products.findOne(name);

  if (findOne) {
    return null;
  }

  const prod = await products.postProduct(name, quantity);
  return prod;
};

const getAllProducts = async () => products.getAllProducts();

const getProductById = async (id) => {
  const prod = await products.getProductById(id);

  return prod;
};

const putProduct = async (id, name, quantity) => {
  return await products.putProduct(id, name, quantity);
};

const deleteProduct = async (id) => {
  return await products.deleteProduct(id);
};

module.exports = {
  getAllProducts,
  getProductById,
  postProduct,
  putProduct,
  deleteProduct
};
