const { createNewProduct } = require('../models/productsModel');
const { validateName, validateQuantity } = require('./validations');

async function addProductToDB(name, quantity) {
  await validateName(name);
  validateQuantity(quantity);
  const result = createNewProduct(name, quantity);
  return result;
}

module.exports = {
  addProductToDB,
};
