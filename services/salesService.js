const {
  createNewSale,
  getAllSalesFromDB,
  findSaleById,
  updateSaleFromDB,
  deleteSaleFromDB,
} = require('../models/salesModels');
const {
  incrementProductQuantity,
  findProductByIdFromDB
} = require('../models/productsModel');
const { validateSaleQuantity } = require('./validations');
const errors = require('./errorsMessage');
const httpStatusCode = require('./httpStatusCode');

async function createSale(sale) {
  sale.forEach((item) => {
    validateSaleQuantity(item.quantity);
  });
  const productInStock = await findProductByIdFromDB(sale[0].productId);
  if (productInStock.quantity < sale[0].quantity) throw {
    status: httpStatusCode.notFound,
    err: {
      code: errors.stockProblem,
      message: errors.quantityNotPermitted,
    }
  };
  await sale.forEach(async ({ productId, quantity }) => {
    await incrementProductQuantity(productId, -quantity);
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

async function deleteSale(id) {
  const saleToDelete = await findSaleById(id);
  if (!saleToDelete) throw {
    status: httpStatusCode.unprocessableEntity,
    err: {
      code: errors.invalidData,
      message: errors.idSaleFormat,
    }
  };
  await saleToDelete.itensSold.forEach(async ({ productId, quantity }) => {
    await incrementProductQuantity(productId, quantity);
  });
  await deleteSaleFromDB(id);
  return saleToDelete;
}

module.exports = {
  createSale,
  listAllSales,
  findOneSale,
  updateSale,
  deleteSale,
};
