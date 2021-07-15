const productModels = require('../../models/Products');
const { validateName, validateLengthName } = require('./validateName');
const validateQuantity = require('./validateQuantity');
const validateProductExists = require('./validateProductExists');

const insertProduct = async (name, quantity) => {
  const validateLengthNameErr = validateLengthName(name);
  const validateQuantityErr = validateQuantity(quantity);
  const insertedProduct = await productModels.insertProduct(name, quantity);
  if (await validateName(name)) return await validateName(name);
  if (validateQuantityErr) return validateQuantityErr;
  if (validateLengthNameErr) return validateLengthNameErr;
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

const updateProductById = async (id, name, quantity) => {
  const productById = await productModels.updateProductById(id, name, quantity);
  const validateQuantityErr = validateQuantity(quantity);
  const validateLengthNameErr = validateLengthName(name);
  if (await validateName(name)) return await validateName(name);
  if (validateQuantityErr) return validateQuantityErr;
  if (validateLengthNameErr) return validateLengthNameErr;
  return productById;
};

module.exports = {
  insertProduct,
  getAll,
  getById,
  updateProductById
};
