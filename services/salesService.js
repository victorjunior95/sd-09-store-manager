const salesModel = require('../models/salesModel');
// const productService = require('../services/productService');
const minQtd = 0;
const error = {
  err: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity'
  }
};

const validateQuantity = (quantity) => {
  if (Number(quantity) < minQtd || quantity == minQtd || !quantity)  return true;
  if (typeof(quantity) !== 'number') return true;
};

// const validateProduct = async (id) => {
//   await salesModel.validateProduct(id)
//     .then((result) => { return result;});;
// };

const createSale = async (items) => {
  let isError = [];
  await items.forEach(({quantity}) => 
  {if (validateQuantity(quantity)) isError.push(true);});

  // items.forEach(({productId}) => {
  //   let valid = validateProduct(productId);
  //   valid.then((valid) => {
  //     console.log(valid);
  //     //if (valid === false) return isError.push(true);
  //   });
  // });
  
  //console.log(`->${isError}<-`);
  if (isError.length) return error;
  
  return salesModel.create(items);
};

const getAllSales = async () => {
  return salesModel.findAll();
};

const getById = async (id) => {
  return await salesModel.findById(id);
};

module.exports = {
  createSale,
  getAllSales,
  getById,
};