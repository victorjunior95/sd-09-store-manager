const {
  getAllProducts,
  findProductById,
  updateById,
  deleteById,
} = require('../models/productsModels');
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

const updateProduct = async (id, name, quantity) => {
  const product = await updateById(id, name, quantity);

  return { code: 200, message: product };
};

const deleteProduct = async (id) => {
  const { code, message } = await findProduct(id);

  if (code === INVALID_ID.code) return { code: code, message: message };
  
  await deleteById(id);

  return { code: code, message: message };
};

module.exports = { 
  allProductsService,
  findProduct,
  updateProduct,
  deleteProduct,
};
