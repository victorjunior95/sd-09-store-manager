const Model = require('../models');

const error_code_400 = 'invalid_data';

const nameValidator = (name) => {
  const nameRegex = /^.{5,}$/;

  return nameRegex.test(name);
};

const quantityTypeValidator = (quantity) => typeof(quantity) === 'number';

const quantityValidator = (quantity) => quantity >= 1;

const addProduct = async (productData) => {
  const { name, quantity } = productData;

  if (!nameValidator(name)) return { err: {
    code: error_code_400,
    message: '"name" length must be at least 5 characters long',
  } };

  if (!quantityTypeValidator(quantity)) return { err: {
    code: error_code_400,
    message: '"quantity" must be a number',
  } };

  if (!quantityValidator(quantity)) return { err: {
    code: error_code_400,
    message: '"quantity" must be larger than or equal to 1',
  } };

  return await Model.products.addProduct(productData);
};

module.exports = {
  addProduct,
};
