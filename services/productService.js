const ProductModel = require('../models/ProductModel');
const minLength = 5;
const minQuantity = 1;

const createValidator = (allProducts, name, quantity) => {
  if (allProducts.find((product) => product.name === name)) {
    return { err: {
      'code': 'invalid_data',
      'message': 'Product already exists',
    }};
  }
  if (name.length < minLength) {
    return { err: {
      'code': 'invalid_data',
      'message': '"name" length must be at least 5 characters long',
    }};
  }
  if (quantity < minQuantity) {
    return { err: {
      'code': 'invalid_data',
      'message': '"quantity" must be larger than or equal to 1',
    }};
  }
  if (typeof quantity !== 'number') {
    return { err: {
      'code': 'invalid_data',
      'message': '"quantity" must be a number',
    }};
  }
};

const create = async (name, quantity) => {
  const allProducts = await ProductModel.getAll();

  if (createValidator(allProducts, name, quantity))
    return createValidator(allProducts, name, quantity);

  const newProduct = await ProductModel.create(name, quantity);
  return newProduct;
};


module.exports = {
  create,
};
