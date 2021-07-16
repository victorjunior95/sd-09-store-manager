const { ObjectId } = require('mongodb');

const productModel = require('../models/products');
const saleModel = require('../models/sales');
const { validateQuantityforSales, validateIDs } = require('./validations');

const HTTP_STATUS_UNPROCESSABLE_ENTITY = 422;
const HTTP_STATUS_NOT_FOUND = 404;
const COEFFICIENT_TO_INVERT_INTEGER = -1;

const decreaseStock = async (sales) => {
  await sales.forEach( async ({ productId, quantity }) => {
    quantity = quantity * COEFFICIENT_TO_INVERT_INTEGER;
    await productModel.updateStock(productId, quantity);
  });
  return;
};

const addSales = async (sales) => {
  const verifyQuantity = await validateQuantityforSales(sales);
  const verifyIDs = await validateIDs(sales);

  if (verifyQuantity.isValid && verifyIDs.isValid) {
    const sale = await saleModel.addSalesDB(sales);
    await decreaseStock(sales);
    return sale;
  }

  return verifyQuantity.err ? verifyQuantity : verifyIDs;
};

const getAllSales = async () => {
  const salesList = await saleModel.getAllSalesDB();
  return salesList;
};

const getSaleById = async (id) => {
  if(!ObjectId.isValid(id)) return {
    status: HTTP_STATUS_NOT_FOUND,
    err: {
      code: 'not_found',
      message: 'Sale not found',
    },
  };

  const sale = await saleModel.getSaleByIdDB(id);

  if (!sale) return {
    status: HTTP_STATUS_NOT_FOUND,
    err: {
      code: 'not_found',
      message: 'Sale not found',
    },
  };

  return sale;
};

const updateSale = async (id, sale) => {
  const verifyQuantity = await validateQuantityforSales(sale);
  const verifyIDs = await validateIDs(sale);

  if (verifyQuantity.isValid && verifyIDs.isValid) {
    const saleEdited = await saleModel.editSaleDB(id, sale);
    return saleEdited;
  }

  return verifyQuantity.err ? verifyQuantity : verifyIDs;  
};

const deleteSale = async (id) => {
  if (!ObjectId.isValid(id)) return {
    status: HTTP_STATUS_UNPROCESSABLE_ENTITY,
    err: {
      code: 'invalid_data',
      message: 'Wrong sale ID format',
    },
  };

  const sale = await saleModel.getSaleByIdDB(id);
  
  if (!sale) return {
    status: HTTP_STATUS_NOT_FOUND,
    err: {
      code: 'not_found',
      message: 'Sale not found',
    },
  };
  
  const { itensSold } = sale;
  const { productId, quantity } = itensSold[0];

  const saleDeleted = await saleModel.deleteSaleDB(id);
  await productModel.updateStock(productId, quantity);
  return saleDeleted;
};

module.exports = {
  addSales,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};
