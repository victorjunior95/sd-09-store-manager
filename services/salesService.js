const { ObjectId } = require('mongodb');
const {
  registerSales,
  getAllSales,
  getSalesById,
  updateSalesById,
  deleteSalesById,
} = require('../models/salesModel');
const { getAllProducts, updateProductById } = require('../models/productsModel');

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;
const HTTP_UNPROCESSABLE_ENTITY_STATUS = 422;

// errors

const invalidIdOrQuantity = {
  err: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity',
  },
};
const errorSaleNotFound = {
  err: {
    code: 'not_found',
    message: 'Sale not found',
  },
};
const errorWrongSaleId = {
  err: {
    code: 'invalid_data',
    message: 'Wrong sale ID format',
  },
};
const errorStockProblem = {
  err: {
    code: 'stock_problem',
    message: 'Such amount is not permitted to sell',
  },
};

// 

const verifyIfProductsExists = async (sales) => {
  const allProductsIds = await getAllProducts()
    .then((products) => products.map(({ _id }) => _id.toString()));
  const salesIds = sales.map(({ productId }) => productId.toString());
  const productsExists = salesIds.every((id) => allProductsIds.includes(id));
  return productsExists;
};

const verifyAllQuantities = (sales) => {
  const minQuantity = 0;
  const isOk = sales
    .every(({ quantity }) => (Number.isInteger(quantity) && quantity > minQuantity ));
  return isOk;
};

const verifySales = async (sales) => {
  const allProductsExists = await verifyIfProductsExists(sales);
  const allQuantitiesIsOk = verifyAllQuantities(sales);
  return (allProductsExists && allQuantitiesIsOk);
};

const verifyStocks = async (sales) => {
  const products = await getAllProducts();
  let isOk = true;
  sales.forEach((sale) => {
    const product = products
      .find(({ _id }) => _id.toString() === sale.productId.toString());
    if (product.quantity < sale.quantity) {
      isOk = false;
    }
  });
  return isOk;
};

const updateQuantity = async (sales) => {
  const products = await getAllProducts();
  sales.forEach(async (sale) => {
    const product = products
      .find(({ _id }) => _id.toString() === sale.productId.toString());
    const newQuantity = product.quantity - sale.quantity;
    await updateProductById(sale.productId, { quantity: newQuantity });
  });
};

const registerSalesService = async (sales) => {
  const isValidSales = await verifySales(sales);
  if (!isValidSales) {
    return { code: HTTP_UNPROCESSABLE_ENTITY_STATUS, response: invalidIdOrQuantity };
  }
  
  const stocksIsOk = await verifyStocks(sales);
  if (!stocksIsOk) {
    return { code: HTTP_NOT_FOUND_STATUS, response: errorStockProblem };
  }
  
  await updateQuantity(sales);

  const registeredSales = await registerSales(sales);
  return { code: HTTP_OK_STATUS, response: registeredSales };
};

const getAllSalesService = async () => {
  const sales = await getAllSales();
  return { code: HTTP_OK_STATUS, response: sales };
};

const getSalesByIdService = async (id) => {
  if (!ObjectId.isValid(id)) {
    return { code: HTTP_NOT_FOUND_STATUS, response: errorSaleNotFound };
  }
  const sales = await getSalesById(id);
  if (!sales) {
    return { code: HTTP_NOT_FOUND_STATUS, response: errorSaleNotFound };
  }
  return { code: HTTP_OK_STATUS, response: sales };
};

const updateSalesByIdService = async (id, newInfos) => {
  const isValidSales = await verifySales(newInfos);
  if (!isValidSales) {
    return { code: HTTP_UNPROCESSABLE_ENTITY_STATUS, response: invalidIdOrQuantity };
  }
  await updateSalesById(id, newInfos);
  const updatedSales = { _id: id, itensSold: newInfos };
  return { code: HTTP_OK_STATUS, response: updatedSales };
};

const deleteSalesByIdService = async (id) => {
  if (!ObjectId.isValid(id)) {
    return { code: HTTP_UNPROCESSABLE_ENTITY_STATUS, response: errorWrongSaleId };
  }
  const deletedSales = await getSalesById(id);
  await deleteSalesById(id);
  return { code: HTTP_OK_STATUS, response: deletedSales };
};

module.exports = {
  registerSalesService,
  getAllSalesService,
  getSalesByIdService,
  updateSalesByIdService,
  deleteSalesByIdService,
};
