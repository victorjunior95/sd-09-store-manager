const productModels = require('../../models/Products');
const validateName = require('./validateName');
const validateQuantity = require('./validateQuantity');
const validateProductExists = require('./validateProductExists');

const insertProduct = async (name, quantity) => {
  const validateNameErr = await validateName(name);
  const validateQuantityErr = validateQuantity(quantity);
  const insertedProduct = await productModels.insertProduct(name, quantity);
  if (validateNameErr) return validateNameErr;
  if (validateQuantityErr) return validateQuantityErr;
  return insertedProduct;
};

const getAll = async () => {
  const allProducts = await productModels.getAll();
  const productsArr = {
    products: [
      ...allProducts
    ]
  };
  return productsArr;
};

const getById = async (id) => {
  const productById = await productModels.getById(id);
  const validateProductExistsErr = await validateProductExists(productById);
  if (validateProductExistsErr) return validateProductExistsErr;
  return productById;
};

module.exports = {
  insertProduct,
  getAll,
  getById
};
