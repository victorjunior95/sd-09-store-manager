const sales = require('../models/sales');
const { decreaseProductQuantity, increaseProductQuantity } = require('./products');

const noData = 'invalid data';

const isValidQuantity = (sale) => {
  const min = 1;
  const isMinQuantity = sale.some(({ quantity }) => quantity < min);
  const isValidQuantity = sale.some(({ quantity }) => typeof(quantity) !== 'number');
  if (isMinQuantity || isValidQuantity) throw { status: 422, result: { error: {
    code: noData,
    message: 'Wrong product ID or invalid quantity',
  }}};
};

const isValidSale = (sale) => {
  if (!sale) throw { status: 404, result: { error: {
    code: noData,
    message: 'Sale not found',
  }}};
};

const isValidId = (id) => {
  if (!id) throw { status: 422, result: { error: {
    code: noData,
    message: 'Wrong sale ID format',
  }}};
};

const getAllSales = async () => {
  const response = await sales.getAllSales();
  return { status: 200, response };
};

const getSalesbyId = async (id) => {
  const response = await sales.getSalesbyId(id);
  isValidSale(response);
  return { status: 200, response };
};

const postSale = async (sale) => {
  isValidQuantity(sale);
  const response = await sales.postSale(sale);
  await decreaseProductQuantity(sale);
  return { status: 200, response };
};

const deleteSale = async (id) => {
  isValidId(id);
  const response = await sales.deleteSales(id);
  await increaseProductQuantity(response.itensSold);
  return { status: 200, response };
};

const putSale = async (id, itensSold) => {
  isValidQuantity(itensSold);
  const response = await sales.putSale(id, itensSold);
  return { status: 200, response };
};

module.exports = {
  getAllSales,
  getSalesbyId,
  postSale,
  deleteSale,
  putSale,
};
