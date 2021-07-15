const {
  createSales,
  getSales,
  getSaleById,
  updateSaleById,
} = require('../models/sales');

const { validSales, validateStock, updateStock } = require('./tools');

const createSalesService = async (sales) => {
  await validSales(sales);
  await validateStock(sales);
  await updateStock(sales, 'DEC');

  const result = await createSales(sales);

  return result;
};

const getSalesService = async () => {
  const result = await getSales();

  return result;
};

const getSaleByIdService = async (saleId) => {
  const result = await getSaleById(saleId);

  if (result === null) {
    throw(Error('not_found_sale'));
  }

  return result;
};

const updateProductByIdService = async (saleId, data) => {
  await validSales(data);

  result = await updateSaleById(saleId, data);

  return result;
};

module.exports = {
  createSalesService,
  getSalesService,
  getSaleByIdService,
  updateProductByIdService,
};