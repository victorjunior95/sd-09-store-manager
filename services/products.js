const { products: productsModel } = require('../models');
const ajv = require('../schemas/validation');

ajv.addKeyword('productNameExists', {
  async: true,
  type: 'string',
  validate: productsModel.checkNameExists
});

exports.getAll = async () => {
  return await productsModel.getAll();
};

exports.create = async (product) => {
  const validate = ajv.getSchema('products');
  const isValid = await validate(product);
  if (!isValid) {
    throw new Error('Oops at create services at products domain');
  }
  return await productsModel.createProduct(product);
};
