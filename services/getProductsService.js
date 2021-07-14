const { getAllProducts, findProductById } = require('../models/productsModels');
const { INVALID_ID } = require('../errors');
const { ObjectId } = require('mongodb');

const allProductsService = async () => {
  const products = await getAllProducts();

  return {
    code: 200,
    message: {
      products,
    },
  };
};

const findProduct = async (id) => {
  if (!ObjectId.isValid(id)) return INVALID_ID;
  const product = await findProductById(id);

  if (product === null || product === undefined) return INVALID_ID;

  return { code: 200, message: product };
};

module.exports = { 
  allProductsService,
  findProduct,
};
