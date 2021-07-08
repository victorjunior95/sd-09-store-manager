const salesModel = require('../models/salesModel');

const { ObjectId } = require('mongodb');

const isValidQuantity = (quantity) => {
  const numberZero = 0;
  if ( typeof quantity !== 'number') {
    return  { 'err':
    {'code': 'invalid_data',
      'message': 'Wrong product ID or invalid quantity'}};
  };
  if ( quantity <= numberZero ) {
    return  { 'err':
    {'code': 'invalid_data',
      'message': 'Wrong product ID or invalid quantity'}};
  }
  return true;
};

const isValidId = async (salesArray) => {
  const response = Promise.all(salesArray.map(async (sale) =>
    await salesModel.findProductId(sale.productId)));
  return response;
};

const create = async (salesArray) => {
  const idValidity = await isValidId(salesArray);
  const errorId = idValidity.find((curr) => curr === null);
  if (errorId === null) {
    return { 'err':
  {'code': 'invalid_data',
    'message': 'Wrong product ID or invalid quantity'}};
  };


  const quantityValidity = salesArray.map((sale) => isValidQuantity(sale.quantity));
  const errorQuantity = quantityValidity.find((curr) =>  typeof curr === 'object');
  if (errorQuantity) return errorQuantity;



  const { sales }= await salesModel
    .create(salesArray);
  return sales;
};


const getAll = async () => {
  const sales = await salesModel.getAll();
  return sales;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return { 'err':
    {'code': 'not_found',
      'message': 'Sale not found'}};
  }
  const sale = await salesModel.getById(id);
  return sale;
};

const updateById = async (id, productId, quantity) => {
  const quantityValidity = isValidQuantity(quantity);
  if (typeof quantityValidity === 'object') return quantityValidity;

  const sale = await salesModel.updateById(id, productId, quantity);
  return sale;
};


module.exports = {
  create,
  getAll,
  getById,
  updateById
};
