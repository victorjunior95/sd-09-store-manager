const productModel = require('../models/productModel');
const five = 5;
const zero = 0;
// const Joi = require('joi');

const getByName = async (name) => {
  const productName = await productModel.queryByName(name);
  return productName;
};

// const schema = Joi.object({
//   name: Joi.string().min(five).required(),
//   // quantity: Joi.number().min(1).integer()
// });

const nameIsValid = (name) => {
  // const productModel = schema.validate({ name });
  if (name.length < five)
    return {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long'
      } };
};

const quantityIsValid = (quantity) => {
  if (quantity <= zero) {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1'
      }};
  };

  if (typeof quantity !== 'number') {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number'
      }};
  };
};

const createNewProduct = async(name, quantity) => {
  if (nameIsValid(name)) return nameIsValid(name);
  if (quantityIsValid(quantity)) return quantityIsValid(quantity);
  if (await getByName(name)) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists'
      } };
  }
  const newProduct = await productModel.create(name, quantity);
  return newProduct;
};

module.exports = {
  createNewProduct
};