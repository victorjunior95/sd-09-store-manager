const { findProductByName, createProductsModel } = require('../model/productsModel');

const MIN_CHARACTERS = 5;
const VALUE_LIMIT = 0;
const DATA_ERROR_CODE = 'invalid_data';

const createProductsService = async (data) => {
  const { name, quantity } = data;
  const productExists = await findProductByName(name);

  if (productExists.length > VALUE_LIMIT) {
    return ({ err: {
      code: DATA_ERROR_CODE,
      message: 'Product already exists'}});
  }

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

  const result = await createProductsModel(data);
  return result;
};

module.exports = createProductsService;
