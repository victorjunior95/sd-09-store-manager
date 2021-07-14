const addProduct = require('../../models/products/addProduct');
const verifyProduct = require('./verifyProduct');
const findProductName = require('../utils/findProductName');

const { productExists } = require('../utils/errorMessages');

const createProduct = async ({ name, quantity }) => {
  const response = await verifyProduct(name, quantity);
  const productAlreadyExists = await findProductName(name);
  if(productAlreadyExists) return { code: 'invalid_data', message: productExists };
  
  if(response) return response;

  const inserted = await addProduct({ name, quantity });
  return inserted;
};

module.exports = createProduct;
