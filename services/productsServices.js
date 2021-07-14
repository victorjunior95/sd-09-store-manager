const {  createProduct, findProductByName } = require('../models/products');
const { validateProduct } = require('./tools');

const VALUE_LIMIT = 0;

const createProductsService = async (data) => {
  const { name } = data;
  console.log(name);
  const product = await findProductByName(name);

  if (product.length > VALUE_LIMIT) throw(Error('Product already exists'));

  let result = validateProduct(data);
  if (!result) {
    result = await createProduct(data);
  }

  return result;
};

module.exports = {
  createProductsService,
};