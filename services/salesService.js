const {
  createSales,
  getSales,
  getSaleById,
  updateSaleById,
} = require('../models/sales');

const { validSales } = require('./tools');

const createSalesService = async (sales) => {
  let result = validSales(sales);

  if (result === null) {
    result = await createSales(sales);
  };

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

const updateProductByIdService = (saleId, data) => {
  await validSales(data);

  const result = await updateSaleById(saleId, data);

  return result;
}

module.exports = {
  createSalesService,
  getSalesService,
  getSaleByIdService,
  updateProductByIdService,
};