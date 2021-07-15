const { validateProduct } = require('./tools');
const {
  createProduct,
  findProductByName,
  getProductById,
  getProducts,
  updateProductById,
} = require('../models/products');

const VALUE_LIMIT = 0;
const DATA_ERROR_CODE = 'invalid_data';

const createProductsService = async (data) => {
  const { name } = data;

  const product = await findProductByName(name);

  if (product.length > VALUE_LIMIT) throw(Error('Product already exists'));

  let result = validateProduct(data);
  if (!result) {
    result = await createProduct(data);
  }

  return result;
};

const getProductsService = async () => {
  const result = await getProducts();

  return result;
};

const getProductByIdService = async (productId) => {
  const result = await getProductById(productId);

  if (result === null) {
    return  ({ err: {
      code: DATA_ERROR_CODE,
      message: 'Wrong id format'}});
  }

  return result;
};

const updateProductByIdService = async (productId, data) => {
  let result = validateProduct(data);

  if (!result) {
    result = await updateProductById(productId, data);
  }

  return result;
};

module.exports = {
  createProductsService,
  getProductsService,
  getProductByIdService,
  updateProductByIdService,
};