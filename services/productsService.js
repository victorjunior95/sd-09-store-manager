const {
  createNewProduct,
  getAllProductsFromDB,
  findProductByIdFromDB
} = require('../models/productsModel');
const { validateName, validateQuantity } = require('./validations');
const { unprocessableEntity } = require('./httpStatusCode');
const errors = require('./errorsMessage');

async function addProductToDB(name, quantity) {
  await validateName(name);
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

module.exports = {
  addProductToDB,
  getAll,
  findProductById,
};
