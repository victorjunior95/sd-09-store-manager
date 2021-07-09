const {
  createNewSale,
  getAllSalesFromDB,
  findSaleById,
  updateSaleFromDB,
} = require('../models/salesModels');
const { validateSaleQuantity } = require('./validations');
const errors = require('./errorsMessage');
const httpStatusCode = require('./httpStatusCode');

async function createSale(sale) {
  sale.forEach((item) => {
    validateSaleQuantity(item.quantity);
  });
  const result = await createNewSale(sale);
  return result;
}

async function listAllSales() {
  const result = await getAllSalesFromDB();
  return { sales: result};
}

async function findOneSale(id) {
  const result = await findSaleById(id);
  if (!result) throw {
    status: httpStatusCode.notFound,
    err: {
      code: errors.notFound,
      message: errors.saleNotFound,
    }
  };
  return result;
}

async function updateSale(id, sale) {
  sale.forEach((item) => {
    validateSaleQuantity(item.quantity);
  });
  const result = await updateSaleFromDB(id, sale);
  return result;
}

module.exports = {
  createSale,
  listAllSales,
  findOneSale,
  updateSale,
};
