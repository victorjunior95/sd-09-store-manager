const {
  INVALID_PRODUCT_LENGTH,
  INVALID_QUANTITY_NUMBER,
  INVALID_QUANTITY_TYPE,
  DUPLICATE_REGISTRATION,
} = require('../errors');

const {
  insertProduct,
  findProduct,
} = require('../models/productsModels');

const productFormatValidator = (name, quantity) => {
  const min_name_length = 5;
  const min_quantity_value = 1;

  if (name.length < min_name_length) return INVALID_PRODUCT_LENGTH;

  if (typeof quantity !== 'number') return INVALID_QUANTITY_TYPE;
  if (quantity < min_quantity_value) return INVALID_QUANTITY_NUMBER;
  return true;
};

const registerProduct = async (name, quantity) => {
  const find = await findProduct(name);

  if(find !== null) return DUPLICATE_REGISTRATION;

  const productRegisted = await insertProduct(name, quantity);

  return { code: 201, message: productRegisted };
};

module.exports = {
  productFormatValidator,
  registerProduct,
};