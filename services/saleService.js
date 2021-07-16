const saleModel = require('../models/saleModel');
const { findProduct } = require('./productService');

let err = {
  code: 'invalid_data',
  message: ''
};

const checkQuantity = (quantity) => {
  const minimal = 1;
  if(quantity < minimal) return true;
  
  if(typeof quantity !== 'number') return true;
};

const validQuantity = (products) => {
  let testedQuantity = products.some(product => checkQuantity(product.quantity));
  if(testedQuantity) {
    err.message = 'Wrong product ID or invalid quantity';
    return { err };
  }
};

const checkId = async (id) =>{
  const selectSale = await saleModel.findId(id);
  if(!selectSale) {
    return {  
      err: {
        code: 'not_found',
        message: 'Sale not found'
      }
    };
  };
};

const createSale = async (products) => {
  const validSale = validQuantity(products);
  if(validSale) return validSale;
  

  const newSale = await saleModel.create(products);
  return newSale;
};

const salesList = async () => {
  const sales = await saleModel.showAll();
  return { sales };
};

// procura por id
const findSale = async (id) => {
  const validId = await checkId(id);
  if(validId) return validId;

  const sale = await saleModel.findId(id);
  return sale;
};

const updateSale = async (id, product) => {
  const validSale = validQuantity(product);
  if(validSale) return validSale;

  const newSale = await saleModel.update(id, product);
  return newSale;
};

const deleteSale = async (id) => {
  const selectSale = await findSale(id);
  if(selectSale.err) return {  
    err: {
      code: 'invalid_data',
      message: 'Wrong sale ID format'
    }
  };

  const sale = await saleModel.drop(id);
  return sale && selectSale;
};

module.exports = {
  createSale,
  salesList,
  findSale,
  updateSale,
  deleteSale
};