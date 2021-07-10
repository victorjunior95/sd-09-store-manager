const salesModel = require('../models/salesModel');
const productModel = require('../models/productModel');


const { ObjectId } = require('mongodb');

const isValidQuantity = (quantity) => {
  const numberZero = 0;
  if ( typeof quantity !== 'number') return 'erro';
  if ( quantity <= numberZero ) return 'erro';
  return true;
};

const isValidId = async (salesArray) => {
  const response = Promise.all(salesArray.map(async (sale) =>
    await salesModel.findProductId(sale.productId)));
  return response;
};

const create = async (salesArray) => {
  const minProductQuantity = 0;
  const idValidity = await isValidId(salesArray);
  const errorId = idValidity.find((curr) => curr === null);
  if (errorId === null) {
    throw {
      'status': 422,
      'code': 'invalid_data',
      'message': 'Wrong product ID or invalid quantity'};
  };


  const quantityValidity = salesArray.map((sale) => isValidQuantity(sale.quantity));
  console.log(quantityValidity);
  const errorQuantity = quantityValidity.find((curr) =>  curr === 'erro');
  console.log('error quantidade', errorQuantity);
  if (errorQuantity) {
    throw {
      'status': 422,
      'code': 'invalid_data',
      'message': 'Wrong product ID or invalid quantity'};
  };



  const { sales }= await salesModel
    .create(salesArray);

  const productPreUpdate = await productModel.getById(sales.itensSold[0].productId);
  const newQuantity = productPreUpdate.quantity - sales.itensSold[0].quantity;
  if (newQuantity < minProductQuantity ) {
    throw {
      'status': 404,
      'code': 'stock_problem',
      'message': 'Such amount is not permitted to sell'};
  }


  const updatedProducts = await productModel
    .updateById(productPreUpdate._id, productPreUpdate.name, newQuantity);
  return sales;
};


const getAll = async () => {
  const sales = await salesModel.getAll();
  return sales;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw  {
      'status': 404,
      'code': 'not_found',
      'message': 'Sale not found'};
  }
  const sale = await salesModel.getById(id);
  if (sale === null) {
    throw  {
      'status': 404,
      'code': 'not_found',
      'message': 'Sale not found'};
  }
  return sale;
};

const updateById = async (id, productId, quantity) => {
  const quantityValidity = isValidQuantity(quantity);
  if (quantityValidity === 'erro') {
    throw {
      'status': 422,
      'code': 'invalid_data',
      'message': 'Wrong product ID or invalid quantity'};
  };

  const sale = await salesModel.updateById(id, productId, quantity);
  return sale;
};

const deleteById = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw {
      'status': 422,
      'code': 'invalid_data',
      'message': 'Wrong sale ID format'};
  };
  const sale = await salesModel.getById(id);

  const productPreDelete = await productModel.getById(sale.itensSold[0].productId);
  const newQuantity = productPreDelete.quantity + sale.itensSold[0].quantity;

  const response = await salesModel.deleteById(id);
  if (!response['deletedCount']) {
    throw {
      'status': 422,
      'code': 'invalid_data',
      'message': 'Wrong sale ID format'};
  };
  await productModel
    .updateById(productPreDelete._id, productPreDelete.name, newQuantity);
  return sale;
};



module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById
};
