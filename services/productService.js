const { createProduct } = require('../models/products');
const joi = require('joi');
const minChar = 5;
const { getProductByName } = require('../models/products');

const userSchema = joi.object({
  name: joi.string().min(minChar).required(),
  quantity: joi.number().min(1).required()
    .messages({ 'number.min': '"quantity" must be larger than or equal to 1'}),
});

const duplicatedProduct = async (productData) => {
  const product = await getProductByName(productData);
  if (product) {
    return {
      message: 'Product already exists'
    };
  };
};

const productCreate = async (productData) => {
  const { error } = userSchema.validate(productData);
  if (error) {
    return {
      status: 422,
      code: 'invalid_data',
      message: error.message,
    };
  }
  const existingProduct = await duplicatedProduct(productData);
  if (existingProduct) return {
    status: 422,
    code: 'invalid_data',
    message: existingProduct.message,
  };

  const data = await createProduct(productData).then(result => result);
  return data;
};

module.exports = {
  productCreate,
};
