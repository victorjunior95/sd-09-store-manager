const {
  createSales,
  getSalesAll,
  getSaleById,
  updateSaleById,
  deleteSaleById,
} = require('../model/salesModel');

const {
  getProductById,
  updateQuantityProductById,
} = require('../model/productsModel');

const VALUE_LIMIT = 1;

const validateSales = async (sales) => {
  sales.forEach((sale) => {
    if (sale.quantity < VALUE_LIMIT || typeof sale.quantity === 'string') {
      throw(Error('Wrong product ID or invalid quantity'));
    }
  });
};

const validateStock = async (sales) => {
  const products = await Promise
    .all(sales.map((sale) => getProductById(sale.productId)));

  products.forEach((product, index) => {
    if (!product || sales[index].quantity > product.quantity) {
      throw(Error('stock_problem'));
    }
  });
};

const updateStock = async (sales, type) => {
  await Promise
    .all(sales
      .map((sale) => updateQuantityProductById(
        sale.productId,
        `${type === 'DEC' ? -sale.quantity : sale.quantity}`)));
};

const createSalesService = async (sales) => {
  await validateSales(sales);
  await validateStock(sales);
  await updateStock(sales, 'DEC');
  const result = await createSales(sales);
  return result;
};

const getSalesAllService = async () => {
  const result = await getSalesAll();
  return result;
};

const getSaleByIdService = async (saleId) => {
  const result = await getSaleById(saleId);
  if (result === null) throw(Error('not_found_sale'));
  return result;
};

const updateSaleByIdService = async (saleId, data) => {
  await validateSales(data);
  const result = await updateSaleById(saleId, data);

  return result;
};

const deleteSaleByIdService = async (saleId) => {
  const sale = await getSaleById(saleId);
  if (sale === null) throw(Error('Wrong sale ID format'));

  await updateStock(sale.itensSold, 'INC');
  const result = await deleteSaleById(saleId);

  return result;
};

module.exports = {
  createSalesService,
  getSalesAllService,
  getSaleByIdService,
  updateSaleByIdService,
  deleteSaleByIdService,
};
