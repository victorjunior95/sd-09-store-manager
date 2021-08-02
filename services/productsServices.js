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

  const alreadyExists = await Model.products.getProductByName(name);

  if (alreadyExists) return { err: {
    code: error_code_400,
    message: 'Product already exists',
  }};

  return await Model.products.addProduct(productData);
};

const getProducts = async () => await Model.products.getProducts();

const getProductById = async (id) => {
  const idRegex = /^.{24}$/;

  const ERROR = {
    err: {
      code: error_code_400,
      message: 'Wrong id format',
    }
  };

  if (!idRegex.test(id)) return ERROR;

  const product = await Model.products.getProductById(id);
  
  if (!product) return ERROR;

  return product;
};

module.exports = {
  addProduct,
  getProducts,
  getProductById,
};
