const {
  findProductByName,
  createProduct,
  getProductsAll,
  getProductById,
  updateProductById,
  deleteProductById,
} = require('../model/productsModel');

const MIN_CHARACTERS = 5;
const VALUE_LIMIT = 0;
const DATA_ERROR_CODE = 'invalid_data';

const validateData = (data) => {
  const { name, quantity } = data;

  if (name.length < MIN_CHARACTERS) {
    return ({ err: {
      code: DATA_ERROR_CODE,
      message: '"name" length must be at least 5 characters long' }});
  }

  if (quantity < VALUE_LIMIT || quantity === VALUE_LIMIT) {
    return ({ err: {
      code: DATA_ERROR_CODE,
      message: '"quantity" must be larger than or equal to 1'}});
  }

  if( typeof quantity !== 'number') {
    return ({ err: {
      code: DATA_ERROR_CODE,
      message: '"quantity" must be a number'}});
  }

  return null;
};

const createProductService = async (data) => {
  const { name } = data;
  const productExists = await findProductByName(name);

  if (productExists.length > VALUE_LIMIT) {
    return ({ err: {
      code: DATA_ERROR_CODE,
      message: 'Product already exists'}});
  }

  let result = validateData(data);

  if(result === null) result = await createProduct(data);

  return result;
};

const getProductsAllService = async () => {
  const result = await getProductsAll();
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
  let result = validateData(data);

  if (result === null) result = await updateProductById(productId, data);

  return result;
};

const deleteProductByIdService = async (productId) => {
  const result = await deleteProductById(productId);

  if (result === null) {
    return  ({ err: {
      code: DATA_ERROR_CODE,
      message: 'Wrong id format'}});
  }
  
  return result;
};

module.exports = {
  createProductService,
  getProductsAllService,
  getProductByIdService,
  updateProductByIdService,
  deleteProductByIdService,
};
