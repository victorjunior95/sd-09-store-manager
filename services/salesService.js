const {
  createSales,
  getSalesAll,
  getSaleById,
  updateSaleById,
  deleteSaleById,
} = require('../model/salesModel');

const VALUE_LIMIT = 1;
const ERROR_MESSAGE = {
  err: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity',
  }
};

const validateSales = (sales) => {
  let message = null;

  sales.forEach((sale) => {
    if (sale.quantity < VALUE_LIMIT || typeof sale.quantity === 'string') {
      message = ERROR_MESSAGE;
    }
  });

  return message;
};

const createSalesService = async (sales) => {
  let result = validateSales(sales);

  if (result === null) result = await createSales(sales);

  return result;
};

const getSalesAllService = async () => {
  const result = await getSalesAll();

  return result;
};

const getSaleByIdService = async (saleId) => {
  const result = await getSaleById(saleId);

  if (result === null) {
    return ({ err: {
      code: 'not_found',
      message: 'Sale not found'
    }});
  }

  return result;
};

const updateSaleByIdService = async (saleId, data) => {
  let result = validateSales(data);
  if (result === null) result = await updateSaleById(saleId, data);

  return result;
};

const deleteSaleByIdService = async (saleId) => {
  const result = await deleteSaleById(saleId);

  if (result === null) {
    return ({ err: {
      code: 'invalid_data',
      message: 'Wrong sale ID format'}});
  }

  return result;
};

module.exports = {
  createSalesService,
  getSalesAllService,
  getSaleByIdService,
  updateSaleByIdService,
  deleteSaleByIdService,
};
