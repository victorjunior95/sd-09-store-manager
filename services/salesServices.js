const Model = require('../models');

const ERROR_CODE_400 = 'invalid_data';
const ERROR_CODE_401 = 'stock_problem';
const ERROR_CODE_404 = 'not_found';
const ERROR_SALES = { err: {
  code: ERROR_CODE_400,
  message: 'Wrong product ID or invalid quantity',
} };
const ERROR_NOT_FOUND = { err: {
  code: ERROR_CODE_404,
  message: 'Sale not found',
} };
const ERROR_SALE_ID = { err: {
  code: ERROR_CODE_400,
  message: 'Wrong sale ID format',
} };
const ERROR_STOCK = { err: {
  code: ERROR_CODE_401,
  message: 'Such amount is not permitted to sell',
} };

const quantityTypeValidator = (quantity) => typeof(quantity) === 'number';

const quantityValidator = (quantity) => quantity >= 1;

const idValidator = (id) => {
  const idRegex = /^.{24}$/;

  return idRegex.test(id);
};

const addSales = async (salesData) => {
  let errorData = false;
  let errorStock = false;
  const stock = [];

  await salesData.forEach(async ({ productId, quantity }) => {
    const test = await Model.products.getProductById(productId);

    if(!test) errorData = true;

    if (test) stock.push(test.quantity);

    if (!quantityTypeValidator(quantity)) errorData = true;

    if (!quantityValidator(quantity)) errorData = true;
  });

  if (errorData) return ERROR_SALES;

  stock.forEach((_product, index) => {
    if (stock[index] < salesData[index].quantity) errorStock = true;
  });

  if (errorStock) return ERROR_STOCK;

  return await Model.sales.addSales(salesData);
};

const getSales = async () => await Model.sales.getSales();

const getSaleById = async (id) => {  
  if (!idValidator(id)) return ERROR_NOT_FOUND;

  const product = await Model.sales.getSaleById(id);
  
  if (!product) return ERROR_NOT_FOUND;

  return product;
};

const updateSale = async (id, updatedSale) => {
  let errorData = false;
  let errorStock = false;
  const stock = [];

  if (!idValidator(id)) return ERROR_SALES;

  await updatedSale.forEach(async ({ productId, quantity }) => {
    if (!quantityTypeValidator(quantity)) errorData = true;

    if (!quantityValidator(quantity)) errorData = true;

    const test = await Model.products.getProductById(productId);

    if(!test) errorData = true;

    if(test) stock.push(test.quantity);
  });

  if (errorData) return ERROR_SALES;

  const oldSale = await Model.sales.getSaleById(id);

  stock.forEach((_product, index) => {
    if (stock[index] < updatedSale[index].quantity - oldSale.itensSold[index].quantity) {
      errorStock = true;
    } 
  });

  if (errorStock) return ERROR_STOCK;

  const sale = await Model.sales.updateSale(id, { itensSold: updatedSale });

  return (sale.matchedCount === 1) ? { _id: id, itensSold: updatedSale } : ERROR_SALES;
};

const deleteSale = async (id) => {
  if (!idValidator(id)) return ERROR_SALE_ID;

  const deletedSale = await Model.sales.getSaleById(id);

  const sale = await Model.sales.deleteSale(id);

  return (sale.deletedCount === 1) ? deletedSale : ERROR_SALE_ID;
};

module.exports = {
  addSales,
  getSales,
  getSaleById,
  updateSale,
  deleteSale,
};
