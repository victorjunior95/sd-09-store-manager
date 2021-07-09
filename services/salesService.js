const salesModel = require('../models/salesModel');
const ZERO = 0;
const quantityValidate = (products) => {
  const validateQuantity = products.every((product) => product.quantity > ZERO);
  const validateType = products.every((product) => typeof product.quantity === 'number');
  if (!validateQuantity || !validateType) return {
    err: {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity'
    }
  };
  return products;
};

const create = async (products) => {
  const validate = quantityValidate(products);
  if (validate.err) return validate;
  const createProducts = await salesModel.create(products);
  return createProducts;
};

module.exports = {
  create,
};