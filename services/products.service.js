const productModel = require('../models/products.model');

const validateProduct = async ({ name, quantity }) => {
  const minQuantity = 1;
  const minNameLength = 5;
  let message;

  if (name.length < minNameLength) {
    message = '"name" length must be at least 5 characters long';
  }

  if (typeof(quantity) !== 'number') message = '"quantity" must be a number';

  if (quantity < minQuantity) {
    message = '"quantity" must be larger than or equal to 1';
  }

  const product = await productModel.findProductByName(name);
  if(product) message = 'Product already exists';

  if (message) return { code: 'invalid_data', message };
};

const createProduct = async (newProduct) => {
  const validationError = await validateProduct(newProduct);
  
  if(validationError) throw { status: 422, data: validationError };

  const product = await productModel.addProduct(newProduct);

  return { status: 201, data: product };
};

module.exports = {
  createProduct,
};
