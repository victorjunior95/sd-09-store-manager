const salesModel = require('../models/salesModel');
const productModel = require('../models/productModel');
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

const validateId = async(id) => {
  const exists = await productModel.findById(id);
  if ( ! exists) {return false;};
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

const updateSale = async (id,items) => {
  if (!validateId(id)) return false;
  const {quantity} = items[0];
  if (validateQuantity(quantity)) return false;
  const salesUp = await salesModel.update(id, items[0]);
  const productId = await salesUp.itensSold[0].productId;
  const saleId = await salesUp._id;

  return ({_id: saleId,itensSold:[{ productId: productId,quantity:quantity}]});
};

const deleteSale = async (id) => {
  if (!validateId(id)) return false;
  return salesModel.deleteSaleById(id);
};

module.exports = {
  createSale,
  getAllSales,
  getById,
  updateSale,
  deleteSale,
};