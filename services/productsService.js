const { unprocessableEntity } = require('./httpStatusCode');
const errors = require('./errorsMessage');
const {
  createNewProduct,
  getAllProductsFromDB,
  findProductByIdFromDB,
  updateProductFromDB,
} = require('../models/productsModel');
const {
  validateNameLength,
  validateProductExists,
  validateQuantity
} = require('./validations');

async function addProductToDB(name, quantity) {
  validateNameLength(name);
  await validateProductExists(name);
  validateQuantity(quantity);
  const result = createNewProduct(name, quantity);
  return result;
}

async function getAll() {
  const result = await getAllProductsFromDB();
  return result;
}

async function findProductById(id) {
  const result = await findProductByIdFromDB(id);
  if (!result) throw {
    status: unprocessableEntity,
    err: {
      code: errors.invalidData,
      message: errors.idFormat,
    }
  };

  return result;
}

async function updateProduct(id, name, quantity) {
  validateQuantity(quantity);
  validateNameLength(name);
  const result = await updateProductFromDB(id, name, quantity);
  return result;
}

module.exports = {
  addProductToDB,
  getAll,
  findProductById,
  updateProduct,
};
