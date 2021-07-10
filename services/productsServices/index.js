const productModels = require('../../models/Products');
const validateName = require('./validateName');
const validateQuantity = require('./validateQuantity');

const insertProduct = async (name, quantity) => {
  const validateNameErr = await validateName(name);
  const validateQuantityErr = validateQuantity(quantity);
  const insertedProduct = await productModels.insertProduct(name, quantity);
  if (validateNameErr) return validateNameErr;
  if (validateQuantityErr) return validateQuantityErr;
  return insertedProduct;
};

module.exports = {
  insertProduct
};
